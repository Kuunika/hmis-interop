import { IsNotEmpty } from 'class-validator';

export class CreateDataValueDto {
  @IsNotEmpty()
  dataElemente: string;

  @IsNotEmpty()
  value: string;
}
