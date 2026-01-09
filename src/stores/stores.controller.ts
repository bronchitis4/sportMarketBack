import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDTO } from './dto/CreateStoreDTO';
import { UpdateStoreDTO } from './dto/UpdateStoreDTO';

@Controller('stores')
export class StoresController {
    constructor(private storesService: StoresService) {}

    @Get()
    getAllStores() {
        return this.storesService.getAllStores();
    }

    @Get(':id')
    getStoreById(@Param('id') id: number) {
        return this.storesService.getStoreById(id);
    }

    @Post()
    createStore(@Body() createStoreDTO: CreateStoreDTO) {
        return this.storesService.createStore(createStoreDTO);
    }

    @Put(':id')
    updateStore(@Param('id') id: number, @Body() updateStoreDTO: UpdateStoreDTO) {
        return this.storesService.updateStore(id, updateStoreDTO);
    }

    @Delete(':id')
    deleteStore(@Param('id') id: number) {
        return this.storesService.deleteStore(id);
    }
}
