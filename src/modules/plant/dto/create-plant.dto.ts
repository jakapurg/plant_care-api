import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  info: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_path: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  days_water: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  care: string;
}
