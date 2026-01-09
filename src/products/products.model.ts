import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Brand } from 'src/brands/brands.model';
import { Category } from 'src/categories/categories.model';

interface ProductCreationAttrs {
    name: string;
    description?: string;
    price: number;
    old_price?: number;
    brand_id: number;
    is_active?: boolean;
    clothing_sizes?: string[];
    shoe_sizes?: string[];
}

interface ProductImageCreationAttrs {
    product_id: number;
    image_url: string;
}

@Table({ tableName: 'productImages' })
export class ProductImage extends Model<ProductImage, ProductImageCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    declare product_id: number;

    @Column({type: DataType.STRING})
    declare image_url: string;
}

@Table({ tableName: 'product_categories', timestamps: false })
export class ProductCategory extends Model<ProductCategory> {
    
    @PrimaryKey
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, field: 'product_id' })
    declare product_id: number;

    @PrimaryKey
    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, field: 'category_id' })
    declare category_id: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare is_primary: boolean;
}

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product, ProductCreationAttrs> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.TEXT })
    declare description?: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare price: number;

    @Column({ type: DataType.DECIMAL(10, 2) })
    declare old_price?: number;

    @ForeignKey(() => Brand)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare brand_id: number;

    @BelongsTo(() => Brand)
    declare brand: Brand;

    @BelongsToMany(() => Category, () => ProductCategory)
    declare categories: Category[];

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    declare is_active: boolean;

    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    declare clothing_sizes?: string[];

    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    declare shoe_sizes?: string[];

    @HasMany(() => ProductImage)
    declare images: ProductImage[];
}
