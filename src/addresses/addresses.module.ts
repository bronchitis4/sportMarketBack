import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './entities/address.model';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([Address]), JwtModule],
    providers: [AddressesService],
    controllers: [AddressesController],
    exports: [AddressesService],
})
export class AddressesModule {}
