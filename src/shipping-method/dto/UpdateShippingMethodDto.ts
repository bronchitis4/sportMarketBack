import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingMethodDto } from './CreateShippingMethodDto';

export class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {}
