import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/validators/isNonPrimitiveArray';
import { Type } from 'class-transformer';
import { CreateDataValueDto } from './index';

export class CreatEventDto {
  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  orgUnit: string;

  @IsNotEmpty()
  eventDate: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  completedDate: string;

  @IsNotEmpty()
  storedBy: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CreateDataValueDto)
  dataValues: CreateDataValueDto[];
}
