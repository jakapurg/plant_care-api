import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Plant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  info: string;

  @ApiProperty()
  @Column()
  image_path: string;

  @ApiProperty()
  @Column()
  days_water: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @CreateDateColumn()
  updated_at: Date;
}
