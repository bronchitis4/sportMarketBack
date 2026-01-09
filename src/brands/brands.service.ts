import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brands.model';
import { CreateBrandDto } from './dto/CreateBrandDto';

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brand) public brandRepository: typeof Brand ) { };
    
    async createBrand (dto: CreateBrandDto) {
        const brand = await this.brandRepository.create(dto);
        return brand;
    } 

    async getAllBrands () {
        const brands = await this.brandRepository.findAll();
        return brands;
    }

    async getBrandById (id: number) {
        const brand = await this.brandRepository.findOne({where: {id: id}});
        return brand;
    }


}
