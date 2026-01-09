import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { wishList, wishListItem } from './wish-list.model';
import { Product } from 'src/products/products.model';

@Injectable()
export class WishListService {
    constructor(@InjectModel(wishList) private wishListRepository: typeof wishList,
        @InjectModel(wishListItem) private wishListItemRepository: typeof wishListItem,
        @InjectModel(Product) private productRepository: typeof Product) { }

    async addWishListItem(userId: number, productId: number) {
        let wishList = await this.wishListRepository.findOne({ where: { user_id: userId } });
        if (!wishList) {
            wishList = await this.wishListRepository.create({ user_id: userId });
        }

        const existingItem = await this.wishListItemRepository.findOne({ where: { wishlist_id: wishList.id, product_id: productId } });
        if (existingItem) {
            await this.wishListItemRepository.destroy({ where: { id: existingItem.id } });
            return existingItem;
        }

        const newItem = await this.wishListItemRepository.create({ wishlist_id: wishList.id, product_id: productId });

        const itemWithProduct = await this.wishListItemRepository.findOne({
            where: { id: newItem.id },
            include: ['product']
        });
        return itemWithProduct;
    }

    async getWishListByUserId(userId: number) {
        const wishList = await this.wishListRepository.findOne({
            where: { user_id: userId },
            include: [{
                model: this.wishListItemRepository,
                as: 'items',
                include: [{ model: this.productRepository }]
            }]
        });
        return wishList;
    }

    async removeWishListItem(whisListItem: number) {
        return await this.wishListItemRepository.destroy({ where: { id: whisListItem } });
    }

}
