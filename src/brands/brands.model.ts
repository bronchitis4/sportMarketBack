import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BrandCreationAttrs {
    name: string;
    logo_url: string;
}

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand, BrandCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true })
    declare name: string;

    @Column({ type: DataType.STRING })
    declare logo_url: string;
}