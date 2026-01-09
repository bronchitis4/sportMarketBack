import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { CreateShippingInfoDto } from './dto/CreateShippingInfoDto';
import { UpdateShippingInfoDto } from './dto/UpdateShippingInfoDto';

@Controller('shipping-info')
export class ShippingInfoController {
    constructor(private shippingInfoService: ShippingInfoService) {}

    @Post()
    create(@Body() dto: CreateShippingInfoDto) {
        return this.shippingInfoService.create(dto);
    }

    @Get()
    findAll() {
        return this.shippingInfoService.findAll();
    }

    @Get('order/:orderId')
    findByOrderId(@Param('orderId') orderId: number) {
        return this.shippingInfoService.findByOrderId(orderId);
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.shippingInfoService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateShippingInfoDto) {
        return this.shippingInfoService.update(id, dto);
    }

    @Put(':id/status')
    updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
        return this.shippingInfoService.updateStatus(id, body.status);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.shippingInfoService.delete(id);
    }
}
