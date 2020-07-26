import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/validators/isNonPrimitiveArray';
import { Type } from 'class-transformer';
import { CreateAttributeDto } from './createAttribute.dto';

export class CreateTrackedEntityDto {
  @IsNotEmpty()
  orgUnit: string;
  @IsNotEmpty()
  trackedEntityType: string;
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CreateAttributeDto)
  attributes: CreateAttributeDto[];
}
