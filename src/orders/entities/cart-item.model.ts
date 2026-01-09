import { Column, ForeignKey, Model, Table, DataType, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Product } from "src/products/products.model";

interface CartItemCreationAttrs {
    user_id: number;
    product_id: number;
    quantity: number;
    size?: string;
}

@Table({ tableName: 'cart_items', timestamps: true })
export class CartItem extends Model<CartItem, CartItemCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @BelongsTo(() => User)
    declare user: User;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare product_id: number;

    @BelongsTo(() => Product)
    declare product: Product;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
    declare quantity: number;

    @Column({ type: DataType.STRING, allowNull: true })
    declare size?: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
}
