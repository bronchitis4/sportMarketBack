import { Table, Model, DataType, Column, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";

interface WishListCreationAttrs {
    user_id: number;
}


@Table({tableName: 'wishlists', timestamps: false})
export class wishList extends Model<wishList, WishListCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;
    
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => wishListItem)
    declare items: wishListItem[];

    declare createdAt?: any;
    declare updatedAt?: any;
}

interface wishListItemCreationAttrs {
    product_id: number;
    wishlist_id: number;
}

@Table({tableName: 'wishlist_item', timestamps: false})
export class wishListItem extends Model<wishListItem, wishListItemCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;
    
    @ForeignKey(() => wishList)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare wishlist_id: number;

    @BelongsTo(() => wishList)
    declare wishlist: wishList;
    
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare product_id: number;

    @BelongsTo(() => Product)
    declare product: Product;

    declare createdAt?: any ;
    declare updatedAt?: any;
}   