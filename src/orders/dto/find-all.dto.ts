import { IsNumberString, IsOptional } from 'class-validator';

export class findAllDto {
  @IsOptional()
  search?: string = "";
}
