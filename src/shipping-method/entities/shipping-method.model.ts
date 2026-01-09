import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'shipping_methods', timestamps: true })
export class ShippingMethod extends Model<ShippingMethod> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	declare id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ 
		type: DataType.STRING, 
		allowNull: false, 
		defaultValue: 'pickup',
		validate: {
			isIn: [['pickup', 'courier', 'post']]
		}
	})
	declare type: string;

	@Column({ type: DataType.TEXT })
	declare description?: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	declare is_active: boolean;

	@Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
	declare price: number;

	@Column({ type: DataType.INTEGER, allowNull: true })
	declare min_delivery_days?: number;

	@Column({ type: DataType.INTEGER, allowNull: true })
	declare max_delivery_days?: number;

	declare createdAt?: Date;
	declare updatedAt?: Date;
}