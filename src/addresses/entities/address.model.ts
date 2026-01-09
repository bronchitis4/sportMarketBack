import { Table, Column, DataType, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ tableName: 'addresses', timestamps: true })
export class Address extends Model<Address> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @BelongsTo(() => User)
    declare user: User;

    @Column({ type: DataType.STRING, allowNull: false })
    declare full_name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare phone: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare street: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare city: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare postal_code: string;

    @Column({ type: DataType.STRING, defaultValue: 'Україна' })
    declare country: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare is_default: boolean;

    declare createdAt?: Date;
    declare updatedAt?: Date;
}
