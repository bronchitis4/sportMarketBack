
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface RefreshTokenCreationAttrs {
    user_id: number;
    token: string;
}

@Table({ tableName: 'refresh_tokens' })
export class RefreshTokens extends Model<RefreshTokens, RefreshTokenCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @Column({ type: DataType.STRING })
    declare token: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare createdAt: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    declare updatedAt: Date;

}