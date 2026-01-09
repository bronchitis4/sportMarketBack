import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product, ProductImage } from './products.model';
import { CreateProductDto } from './dto/CreateProductDto';
import { Category } from 'src/categories/categories.model';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class ProductsService {
    constructor(private brandService: BrandsService, private categoryService: CategoriesService, @InjectModel(Category) private categoryRepository: typeof Category, @InjectModel(Product) private productRepository: typeof Product, @InjectModel(ProductImage) private productImageRepository: typeof ProductImage) { };

    async createProduct(createDto: CreateProductDto, files: { images?: Express.Multer.File[] }) {
        const { category_ids, ...productData } = createDto;
        const product = await this.productRepository.create(productData);

        if (category_ids && category_ids.length > 0) {
            const categories = await this.categoryRepository.findAll({
                where: { id: category_ids }
            });
            await product.$set('categories', categories);
        }

        if (files.images && files.images.length > 0) {
            await Promise.all(
                (files.images || []).map(file =>
                    this.productImageRepository.create({ product_id: product.id, image_url: file.filename }),
                )
            )
        }
        return product;
    }

    async getProductsByBrandId(brand_id: number) {
        const products = await this.productRepository.findAll({
            where: { brand_id: brand_id },
            include: [{
                model: this.productImageRepository,
                as: 'images',
                attributes: ['image_url']
            }]
        })

        return products;
    }

    private async getCategoryDescendantIds(rootId: number): Promise<number[]> {
        const ids = [rootId];
        let newIds = [rootId];

        while (newIds.length > 0) {
            const children = await this.categoryRepository.findAll({
                where: { parent_id: newIds },
                attributes: ['id']
            });

            newIds = children.map(c => c.id).filter(id => !ids.includes(id));
            ids.push(...newIds);
        }

        return ids;
    }


    async getProductsByCategoryId(categoryId: number) {
        const categoryIds = await this.getCategoryDescendantIds(categoryId);

        if (categoryIds.length === 0) {
            return [];
        }

        const products = await this.productRepository.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                    where: { id: categoryIds },
                },
                {
                    model: this.productImageRepository,
                    as: 'images',
                    attributes: ['image_url']
                }
            ]
        });

        return products;
    }

    async getProductsByMultipleCategoryIds(categoryIds: number[]) {
        if (!categoryIds || categoryIds.length === 0) {
            return [];
        }

        const allCategoryIds = new Set<number>();

        for (const categoryId of categoryIds) {
            const descendantIds = await this.getCategoryDescendantIds(categoryId);
            descendantIds.forEach(id => allCategoryIds.add(id));
        }

        if (allCategoryIds.size === 0) {
            return [];
        }

        const products = await this.productRepository.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                    where: { id: Array.from(allCategoryIds) },
                },
                {
                    model: this.productImageRepository,
                    as: 'images',
                    attributes: ['image_url']
                }
            ]
        });

        return products;
    }
    async getAllProducts(limit: number = 10, offset: number = 0) {
        const products = await this.productRepository.findAll({
            limit: limit,
            offset: offset,
            include: [{
                model: this.productImageRepository,
                as: 'images',
                attributes: ['image_url']
            }]
        });

        return products;
    }

    async getProductById(id: number) {
        const product = await this.productRepository.findByPk(id, {
            include: [{
                model: this.productImageRepository,
                as: 'images',
                attributes: ['image_url']
            },
            {
                model: this.brandService.brandRepository,
                as: 'brand',
                attributes: ['id', 'name']
            }
            ]
        });
        return product;
    }
}
