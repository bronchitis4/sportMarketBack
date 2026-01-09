import { Table, Column, DataType, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from 'src/orders/entities/orders.model';
import { ShippingMethod } from 'src/shipping-method/entities/shipping-method.model';
import { Store } from 'src/stores/entities/store.model';

@Table({ tableName: 'shipping_info', timestamps: true })
export class ShippingInfo extends Model<ShippingInfo> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
    declare order_id: number;

    @BelongsTo(() => Order)
    declare order: Order;

    @ForeignKey(() => ShippingMethod)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare shipping_method_id: number;

    @BelongsTo(() => ShippingMethod)
    declare shipping_method: ShippingMethod;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 })
    declare shipping_cost: number;

    @ForeignKey(() => Store)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare store_id?: number;

    @BelongsTo(() => Store)
    declare store?: Store;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare shipping_address_id?: number;

    @Column({ type: DataType.STRING })
    declare tracking_number?: string;

    @Column({ type: DataType.DATE, allowNull: true })
    declare estimated_delivery_date?: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    declare actual_delivery_date?: Date;

    @Column({ 
        type: DataType.STRING, 
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'processing', 'ready_for_pickup', 'shipped', 'in_transit', 'delivered', 'cancelled']]
        }
    })
    declare shipping_status: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare notes?: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
}
