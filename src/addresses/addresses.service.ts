import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './entities/address.model';
import { CreateAddressDto } from './dto/CreateAddressDto';
import { UpdateAddressDto } from './dto/UpdateAddressDto';

@Injectable()
export class AddressesService {
    constructor(@InjectModel(Address) private addressRepository: typeof Address) {}

    async create(userId: number, dto: CreateAddressDto) {
        if (dto.is_default) {
            await this.addressRepository.update(
                { is_default: false },
                { where: { user_id: userId } }
            );
        }

        const address = await this.addressRepository.create({
            user_id: userId,
            ...dto
        } as any);

        return address;
    }

    async findUserAddresses(userId: number) {
        return await this.addressRepository.findAll({
            where: { user_id: userId }
        });
    }

    async findById(id: number, userId: number) {
        const address = await this.addressRepository.findOne({
            where: { id, user_id: userId }
        });

        if (!address) {
            throw new NotFoundException('Address not found');
        }

        return address;
    }

    async update(id: number, userId: number, dto: UpdateAddressDto) {
        const address = await this.findById(id, userId);

        if (dto.is_default === true) {
            await this.addressRepository.update(
                { is_default: false },
                { where: { user_id: userId, id: { [require('sequelize').Op.ne]: id } } }
            );
        }

        await address.update(dto as any);
        return address;
    }

    async setDefault(id: number, userId: number) {
        const address = await this.findById(id, userId);

        await this.addressRepository.update(
            { is_default: false },
            { where: { user_id: userId, id: { [require('sequelize').Op.ne]: id } } }
        );

        address.is_default = true;
        await address.save();
        return address;
    }

    async delete(id: number, userId: number) {
        const address = await this.findById(id, userId);
        await address.destroy();
        return { deleted: true, id };
    }
}
