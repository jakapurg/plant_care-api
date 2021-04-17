import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform, Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plant } from '../plant/plant.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserPlant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Plant)
  @JoinColumn({ name: 'plant_id' })
  @Type(() => Plant)
  //@Transform((plant) => plant.value.id)
  plant: Plant;

  @Exclude()
  @Column()
  plant_id: number;

  @Exclude()
  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Type(() => User)
  @Transform((user) => user.value.id)
  user: User;

  @Exclude()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column({ nullable: true })
  last_water_date?: Date;

  @ApiProperty()
  @Expose()
  remaining_water_days: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
