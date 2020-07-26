import { IsNotEmpty } from 'class-validator';
export class CreateAttributeDto {
  @IsNotEmpty()
  attribute: string;
  @IsNotEmpty()
  value: string;
}
