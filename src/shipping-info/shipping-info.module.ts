import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShippingInfo } from './entities/shipping-info.model';
import { ShippingInfoService } from './shipping-info.service';
import { ShippingInfoController } from './shipping-info.controller';

@Module({
    imports: [SequelizeModule.forFeature([ShippingInfo])],
    providers: [ShippingInfoService],
    controllers: [ShippingInfoController],
    exports: [ShippingInfoService],
})
export class ShippingInfoModule {}
