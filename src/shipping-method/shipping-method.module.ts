import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShippingMethod } from './entities/shipping-method.model';
import { ShippingMethodService } from './shipping-method.service';
import { ShippingMethodController } from './shipping-method.controller';

@Module({
	imports: [SequelizeModule.forFeature([ShippingMethod])],
	providers: [ShippingMethodService],
	controllers: [ShippingMethodController],
	exports: [ShippingMethodService],
})
export class ShippingMethodModule {}
