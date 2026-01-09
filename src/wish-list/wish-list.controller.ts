import { Body, Controller, Post, UseGuards, Request, Get, Delete, Param, Req } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishItemDto } from './dto/CreateWishItemDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wish-list')
export class WishListController {
    constructor(private wishListService: WishListService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('add')
    addToWishList(@Request() req, @Body() createDto: CreateWishItemDto) {
        const userId = req.user.id;
        return this.wishListService.addWishListItem(userId, createDto.product_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getWishList(@Request() req) {
        const userId = req.user.id;
        return this.wishListService.getWishListByUserId(userId);
    }

    @Delete('remove/:id')
    removeWishListItem(@Param('id') id: number) {
        return this.wishListService.removeWishListItem(id);
    }
}
