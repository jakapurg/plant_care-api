import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateUserPlantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  plant_id: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  last_water_date: Date;
}
