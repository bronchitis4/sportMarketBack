import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/CreateBrandDto';

@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}
    
    @Get('/')
    getAllBrands() {
        return this.brandsService.getAllBrands();
    }

    @Post('/')
    createBrand (@Body() createDto: CreateBrandDto) {
        return this.brandsService.createBrand(createDto);
    }

    @Get('/:id')
    getBrandById(@Param('id') id: number) {
        return this.brandsService.getBrandById(id);
    }
}
