import { AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product, ProductCategory } from "src/products/products.model";

export interface CategoryCreationAttrs {
    name: string;
    parent_id: number;
    logo_url: string;
}

@Table({ tableName: 'Categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true })
    declare name: string;

    @Column({ type: DataType.STRING })
    declare logo_url?: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare parent_id: number | null;

    @BelongsToMany(() => Product, () => ProductCategory)
    declare products: Product[];
}