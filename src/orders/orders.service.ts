import { Injectable, BadRequestException } from '@nestjs/common';
import { Order, OrderItem } from './entities/orders.model';
import { CartItem } from './entities/cart-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { Product, ProductImage } from 'src/products/products.model';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { AddToCartDto } from './dto/AddToCartDto';
import { UpdateCartItemDto } from './dto/UpdateCartItemDto';
import { Store } from 'src/stores/entities/store.model';
import { ShippingInfo } from 'src/shipping-info/entities/shipping-info.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
        @InjectModel(CartItem) private cartItemRepository: typeof CartItem,
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(ProductImage) private productImageRepository: typeof ProductImage,
        @InjectModel(ShippingInfo) private shippingInfoRepository: typeof ShippingInfo,
        @InjectModel(Store) private storeRepository: typeof Store,
    ) { }

    async addToCart(userId: number, addToCartDto: AddToCartDto) {
        const { product_id, quantity, size } = addToCartDto;
        
        const product = await this.productRepository.findByPk(product_id);
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        if (size) {
            const hasClothingSize = product.clothing_sizes && product.clothing_sizes.includes(size);
            const hasShoeSize = product.shoe_sizes && product.shoe_sizes.includes(size);
            
            if (!hasClothingSize && !hasShoeSize) {
                throw new BadRequestException('Selected size is not available for this product');
            }
        }

        const whereClause: any = { 
            user_id: userId, 
            product_id: product_id
        };
        
        if (size) {
            whereClause.size = size;
        }
        
        let cartItem = await this.cartItemRepository.findOne({
            where: whereClause
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await this.cartItemRepository.create({
                user_id: userId,
                product_id: product_id,
                quantity: quantity,
                size: size
            });
        }

        return cartItem;
    }

    async getCart(userId: number) {
        const cartItems = await this.cartItemRepository.findAll({
            where: { user_id: userId },
            include: [{ model: this.productRepository,
                include: [{model: this.productImageRepository, as: 'images'}]
            }]
        });
        console.log("CARITEMS:",cartItems);
        return cartItems;
    }

    async updateCartItem(userId: number, cartItemId: number, updateDto: UpdateCartItemDto) {
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: cartItemId, user_id: userId },
            include: [{ model: this.productRepository }]
        });

        if (!cartItem) {
            throw new BadRequestException('Cart item not found');
        }

        if (updateDto.quantity && updateDto.quantity > 0) {
            cartItem.quantity = updateDto.quantity;
        }

        if (updateDto.size !== undefined) {
            if (updateDto.size) {
                const product = cartItem.product;
                const hasClothingSize = product.clothing_sizes && product.clothing_sizes.includes(updateDto.size);
                const hasShoeSize = product.shoe_sizes && product.shoe_sizes.includes(updateDto.size);
                
                if (!hasClothingSize && !hasShoeSize) {
                    throw new BadRequestException('Selected size is not available for this product');
                }
            }
            cartItem.size = updateDto.size;
        }

        await cartItem.save();

        return cartItem;
    }

    async removeFromCart(userId: number, cartItemId: number) {
        return await this.cartItemRepository.destroy({
            where: { id: cartItemId, user_id: userId }
        });
    }

    async clearCart(userId: number) {
        return await this.cartItemRepository.destroy({
            where: { user_id: userId }
        });
    }

    async createOrder(userId: number, createOrderDto: CreateOrderDto) {
        const cartItems = await this.cartItemRepository.findAll({
            where: { user_id: userId },
            include: [{ model: this.productRepository }]
        });

        if (cartItems.length === 0) {
            throw new BadRequestException('Cart is empty');
        }

        let totalAmount = 0;
        for (const item of cartItems) {
            totalAmount += item.product.price * item.quantity;
        }

        totalAmount += createOrderDto.shipping_cost;

        const orderNumber = `ORD-${Date.now()}-${userId}`;

        const order = await this.orderRepository.create({
            user_id: userId,
            order_number: orderNumber,
            total_amount: totalAmount,
            status: 'pending',
            customer_notes: createOrderDto.customer_notes
        });

        const orderItems: OrderItem[] = [];
        for (const cartItem of cartItems) {
            const orderItem = await this.orderItemRepository.create({
                order_id: order.id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                unit_price: cartItem.product.price as any,
                total_price: (cartItem.product.price as any) * cartItem.quantity
            });
            orderItems.push(orderItem);
        }

        await this.clearCart(userId);

        return {
            order,
            items: orderItems
        };
    }

    async getOrder(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, {
            include: [
                { model: this.orderItemRepository, include: [{ model: this.productRepository }] }
            ]
        });
        return order;
    }
    
    async getAllOrders() {
        const orders = await this.orderRepository.findAll({
            include: [{ model: this.orderItemRepository, include: [{ model: this.productRepository }]}, { model: this.shippingInfoRepository, include: [{ model: this.storeRepository }] }],
            
        });
        return orders;
    }

    async getUserOrders(userId: number) {
        const orders = await this.orderRepository.findAll({
            where: { user_id: userId },
            include: [{ model: this.orderItemRepository, include: [{ model: this.productRepository, include: [{model: this.productImageRepository, as:"images"}] }] }]
        });
        return orders;
    }

    async updateOrderStatus(orderId: number, status: string) {
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new BadRequestException(`Invalid status. Valid values: ${validStatuses.join(', ')}`);
        }

        const order = await this.orderRepository.findByPk(orderId);
        if (!order) {
            throw new BadRequestException('Order not found');
        }

        order.status = status;
        await order.save();
        return order;
    }
}
