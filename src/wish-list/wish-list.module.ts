import { Module } from '@nestjs/common';
import { WishListController } from './wish-list.controller';
import { wishList, wishListItem } from './wish-list.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { WishListService } from './wish-list.service';
import { Product } from 'src/products/products.model';

@Module({
  controllers: [WishListController],
  providers: [WishListService],
  imports: [
    SequelizeModule.forFeature([wishList, wishListItem, Product]),
    JwtModule
  ]
})
export class WishListModule {}
