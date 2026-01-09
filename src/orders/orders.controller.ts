import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { AddToCartDto } from './dto/AddToCartDto';
import { UpdateCartItemDto } from './dto/UpdateCartItemDto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('cart/add')
    addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
        const userId = req.user.id;
        return this.ordersService.addToCart(userId, addToCartDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('cart')
    getCart(@Request() req) {
        const userId = req.user.id;
        return this.ordersService.getCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('cart/:cartItemId')
    updateCartItem(@Request() req, @Param('cartItemId') cartItemId: number, @Body() updateDto: UpdateCartItemDto) {
        const userId = req.user.id;
        return this.ordersService.updateCartItem(userId, cartItemId, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('cart/item/:cartItemId')
    updateCartItemPatch(@Request() req, @Param('cartItemId') cartItemId: number, @Body() updateDto: UpdateCartItemDto) {
        const userId = req.user.id;
        return this.ordersService.updateCartItem(userId, cartItemId, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('cart/:cartItemId')
    removeFromCart(@Request() req, @Param('cartItemId') cartItemId: number) {
        const userId = req.user.id;
        return this.ordersService.removeFromCart(userId, cartItemId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('cart/item/:cartItemId')
    removeFromCartItem(@Request() req, @Param('cartItemId') cartItemId: number) {
        const userId = req.user.id;
        return this.ordersService.removeFromCart(userId, cartItemId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('cart')
    clearCart(@Request() req) {
        const userId = req.user.id;
        return this.ordersService.clearCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('confirm')
    createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
        const userId = req.user.id;
        return this.ordersService.createOrder(userId, createOrderDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-orders')
    getUserOrders(@Request() req) {
        const userId = req.user.id;
        return this.ordersService.getUserOrders(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':orderId')
    getOrder(@Param('orderId') orderId: number) {
        return this.ordersService.getOrder(orderId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':orderId/status')
    updateOrderStatus(@Param('orderId') orderId: number, @Body() body: { status: string }) {
        return this.ordersService.updateOrderStatus(orderId, body.status);
    }
}
