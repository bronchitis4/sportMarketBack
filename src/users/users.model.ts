import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    username: string;
    password_hash: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    declare email: string;

    @Column({ type: DataType.STRING })
    declare username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password_hash: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: "user" })
    declare role: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare is_active: boolean;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare createdAt: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare updatedAt: Date;
}