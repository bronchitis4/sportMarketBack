import { Column, ForeignKey, Model, Table, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasMany, HasOne } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Product } from "src/products/products.model";
import { Store } from "src/stores/entities/store.model";
import { ShippingInfo } from "src/shipping-info/entities/shipping-info.model";

interface OrderCreationAttrs {
    user_id: number;
    order_number: string;
    total_amount: number;
    status?: string;
    customer_notes?: string;
}

interface OrderItemCreationAttrs {
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
}

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order, OrderCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @BelongsTo(() => User)
    declare user: User;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare order_number: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare total_amount: number;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'confirmed', 'completed', 'cancelled']]
        }
    })
    declare status: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare customer_notes?: string;

    @HasMany(() => OrderItem)
    declare items: OrderItem[];


    @HasOne(() => ShippingInfo)
    declare shippingInfos: ShippingInfo;

    declare createdAt?: Date;
    declare updatedAt?: Date;
}

@Table({ tableName: 'order_items', timestamps: true })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare order_id: number;

    @BelongsTo(() => Order)
    declare order: Order;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare product_id: number;

    @BelongsTo(() => Product)
    declare product: Product;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare unit_price: number;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare total_price: number;

    declare createdAt?: Date;
}