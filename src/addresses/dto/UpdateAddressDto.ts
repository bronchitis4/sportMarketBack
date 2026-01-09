import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './CreateAddressDto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
