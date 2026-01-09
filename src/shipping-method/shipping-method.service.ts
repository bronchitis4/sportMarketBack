import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShippingMethod } from './entities/shipping-method.model';
import { CreateShippingMethodDto } from './dto/CreateShippingMethodDto';
import { UpdateShippingMethodDto } from './dto/UpdateShippingMethodDto';

@Injectable()
export class ShippingMethodService {
  constructor(@InjectModel(ShippingMethod) private shippingRepo: typeof ShippingMethod) {}

  async create(dto: CreateShippingMethodDto) {
    const method = await this.shippingRepo.create(dto as any);
    return method;
  }

  async findAll(activeOnly = false) {
    const where = activeOnly ? { is_active: true } : undefined;
    return this.shippingRepo.findAll({ where });
  }

  async findById(id: number) {
    const item = await this.shippingRepo.findByPk(id);
    if (!item) throw new NotFoundException('Shipping method not found');
    return item;
  }

  async update(id: number, dto: UpdateShippingMethodDto) {
    const method = await this.findById(id);
    await method.update(dto as any);
    return method;
  }

  async setActive(id: number, active: boolean) {
    const method = await this.findById(id);
    method.is_active = active;
    await method.save();
    return method;
  }

  async remove(id: number) {
    const method = await this.findById(id);
    await method.destroy();
    return { deleted: true };
  }
}

