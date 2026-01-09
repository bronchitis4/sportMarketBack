import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './entities/store.model';
import { CreateStoreDTO } from './dto/CreateStoreDTO';
import { UpdateStoreDTO } from './dto/UpdateStoreDTO';

@Injectable()
export class StoresService {
    constructor(@InjectModel(Store) private storeRepository: typeof Store) { };

    async getAllStores() {
        return await this.storeRepository.findAll();
    }

    async getStoreById(storeId: number) {
        const store = await this.storeRepository.findByPk(storeId);
        if (!store) {
            throw new NotFoundException('Store not found');
        }
        return store;
    }

    async createStore(storeData: CreateStoreDTO) {
        return await this.storeRepository.create(storeData as any);
    }

    async updateStore(storeId: number, updateData: UpdateStoreDTO) {
        const store = await this.getStoreById(storeId);
        await store.update(updateData as any);
        return store;
    }

    async deleteStore(storeId: number) {
        const store = await this.getStoreById(storeId);
        await store.destroy();
        return { deleted: true, id: storeId };
    }
}
