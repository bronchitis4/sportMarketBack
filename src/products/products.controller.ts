import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {}
    
    @Post('/')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 5 },
        ]),
    )
    createProduct(
        @Body() createDto: CreateProductDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] }
    ) {
        return this.productService.createProduct(createDto, files);
    }

    @Get('brand/:brand_id')
    getProductsByBrandId(@Param('brand_id') brand_id: number) {
        return this.productService.getProductsByBrandId(brand_id);
    }
    
    @Get('category/:category_id')
    getProductsByCategotyId(@Param('category_id') category_id: number) {
        return this.productService.getProductsByCategoryId(category_id);
    }

    @Get('categories/multiple')
    getProductsByMultipleCategories(@Query('ids') ids: string) {
        if (!ids) {
            return [];
        }
        const categoryIds = ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        return this.productService.getProductsByMultipleCategoryIds(categoryIds);
    }

    @Get()
    getAllProducts(@Query('limit') limit: string, @Query('offset') offset: string) {
        const productLimit = limit ? parseInt(limit, 10) : 10;         
        const finalLimit = isNaN(productLimit) ? 10 : productLimit;
        
        const productOffset = offset ? parseInt(offset, 10) : 0;
        const finalOffset = isNaN(productOffset) ? 0 : productOffset;
        
        return this.productService.getAllProducts(finalLimit, finalOffset);
    }

    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

}
