import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDTO } from './CreateStoreDTO';

export class UpdateStoreDTO extends PartialType(CreateStoreDTO) {}
