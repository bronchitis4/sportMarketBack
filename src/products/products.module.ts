import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product, ProductCategory, ProductImage } from './products.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { Category } from 'src/categories/categories.model';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Product, ProductImage, Category, ProductCategory]),
        JwtModule,
        CategoriesModule,
        BrandsModule,
               
    ],
    exports: [ProductsService]
})
export class ProductsModule {}
