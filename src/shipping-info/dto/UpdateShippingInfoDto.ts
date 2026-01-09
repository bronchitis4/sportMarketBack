import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingInfoDto } from './CreateShippingInfoDto';

export class UpdateShippingInfoDto extends PartialType(CreateShippingInfoDto) {}
