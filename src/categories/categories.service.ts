import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { Category } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) public categoryRepository: typeof Category) { };

    async createCategory(dto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(dto);
        return category;
    }
    async getAllMainCategories() {
        const categories = await this.categoryRepository.findAll({
            where: { parent_id: null}
        });
        const categoriesWithChildren = await Promise.all(categories.map(async category => {
            const children = await this.categoryRepository.findAll({
                where: { parent_id: category.id }
            });
            return { ...category.get(), children };
        }));
        return categoriesWithChildren;
    }

    async getCategoryById(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id: id } });
        return category;
    }
}
