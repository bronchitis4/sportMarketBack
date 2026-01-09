import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ShippingMethodService } from './shipping-method.service';
import { CreateShippingMethodDto } from './dto/CreateShippingMethodDto';
import { UpdateShippingMethodDto } from './dto/UpdateShippingMethodDto';

@Controller('shipping-methods')
export class ShippingMethodController {
  constructor(private service: ShippingMethodService) {}

  @Post()
  create(@Body() dto: CreateShippingMethodDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('active') active?: string) {
    const activeOnly = active === 'true' || active === '1';
    return this.service.findAll(activeOnly);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateShippingMethodDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/activate')
  activate(@Param('id') id: number) {
    return this.service.setActive(id, true);
  }

  @Put(':id/deactivate')
  deactivate(@Param('id') id: number) {
    return this.service.setActive(id, false);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
