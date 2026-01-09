import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get('/')
    getAllMainCategories() {
        return this.categoriesService.getAllMainCategories();
    }

    @Post('/')
    createBrand(@Body() createDto: CreateCategoryDto) {
        return this.categoriesService.createCategory(createDto);
    }

    @Get('/:id')
    getBrandById(@Param('id') id: number) {
        return this.categoriesService.getCategoryById(id);
    }
}
