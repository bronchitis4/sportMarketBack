import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order, OrderItem } from './entities/orders.model';
import { CartItem } from './entities/cart-item.model';
import { Product, ProductImage } from 'src/products/products.model';
import { JwtModule } from '@nestjs/jwt';
import { Store } from 'src/stores/entities/store.model';
import { ShippingInfo } from 'src/shipping-info/entities/shipping-info.model';

@Module({
    providers: [OrdersService],
    controllers: [OrdersController],
    imports: [
        SequelizeModule.forFeature([Order, OrderItem, CartItem, Product, ProductImage, ShippingInfo, Store]),
        JwtModule
    ],
    exports: [OrdersService],
})
export class OrdersModule {}
