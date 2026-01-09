import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/CreateAddressDto';
import { UpdateAddressDto } from './dto/UpdateAddressDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() dto: CreateAddressDto) {
        const userId = req.user.id;
        return this.addressesService.create(userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findUserAddresses(@Request() req) {
        const userId = req.user.id;
        return this.addressesService.findUserAddresses(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findById(@Request() req, @Param('id') id: number) {
        const userId = req.user.id;
        return this.addressesService.findById(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Request() req, @Param('id') id: number, @Body() dto: UpdateAddressDto) {
        const userId = req.user.id;
        return this.addressesService.update(id, userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/set-default')
    setDefault(@Request() req, @Param('id') id: number) {
        const userId = req.user.id;
        return this.addressesService.setDefault(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Request() req, @Param('id') id: number) {
        const userId = req.user.id;
        return this.addressesService.delete(id, userId);
    }
}
