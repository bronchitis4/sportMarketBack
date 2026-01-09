import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShippingInfo } from './entities/shipping-info.model';
import { CreateShippingInfoDto } from './dto/CreateShippingInfoDto';
import { UpdateShippingInfoDto } from './dto/UpdateShippingInfoDto';

@Injectable()
export class ShippingInfoService {
    constructor(@InjectModel(ShippingInfo) private shippingInfoRepo: typeof ShippingInfo) {}

    async create(dto: CreateShippingInfoDto) {
        const existing = await this.shippingInfoRepo.findOne({
            where: { order_id: dto.order_id }
        });
        if (existing) {
            throw new BadRequestException('Shipping info for this order already exists');
        }

        const shippingInfo = await this.shippingInfoRepo.create(dto as any);
        return shippingInfo;
    }

    async findByOrderId(orderId: number) {
        const shippingInfo = await this.shippingInfoRepo.findOne({
            where: { order_id: orderId },
            include: ['shipping_method', 'store']
        });
        if (!shippingInfo) {
            throw new NotFoundException('Shipping info not found for this order');
        }
        return shippingInfo;
    }

    async findById(id: number) {
        const shippingInfo = await this.shippingInfoRepo.findByPk(id, {
            include: ['shipping_method', 'store']
        });
        if (!shippingInfo) {
            throw new NotFoundException('Shipping info not found');
        }
        return shippingInfo;
    }

    async findAll() {
        return await this.shippingInfoRepo.findAll({
            include: ['shipping_method', 'store']
        });
    }

    async update(id: number, dto: UpdateShippingInfoDto) {
        const shippingInfo = await this.findById(id);
        await shippingInfo.update(dto as any);
        return shippingInfo;
    }

    async updateStatus(id: number, status: string) {
        const validStatuses = ['pending', 'processing', 'ready_for_pickup', 'shipped', 'in_transit', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new BadRequestException(`Invalid status. Valid values: ${validStatuses.join(', ')}`);
        }

        const shippingInfo = await this.findById(id);
        shippingInfo.shipping_status = status;
        
        if (status === 'delivered' && !shippingInfo.actual_delivery_date) {
            shippingInfo.actual_delivery_date = new Date();
        }

        await shippingInfo.save();
        return shippingInfo;
    }

    async delete(id: number) {
        const shippingInfo = await this.findById(id);
        await shippingInfo.destroy();
        return { deleted: true, id };
    }
}
