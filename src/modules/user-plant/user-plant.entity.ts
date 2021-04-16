import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform, Exclude, Expose } from 'class-transformer';
import {
  AfterLoad,
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

  @AfterLoad()
  remainingWaterDays(): void {
    /*if(this.last_water_date){
            var waterDate = this.last_water_date;
            const curDate = new Date();
            waterDate.setDate(waterDate.getDate()+this.plant.days_water);
            console.log(waterDate)
            if(waterDate<curDate){
                return 0;
            }
            else{
                console.log(curDate)
                return (new Date(waterDate.getTime()-curDate.getTime())).getDate();
            }
        }
        else{
            return 0;
        }
        return this.last_water_date;*/
    if (this.last_water_date) {
      const waterDate = this.last_water_date;
      const curDate = new Date();
      waterDate.setDate(waterDate.getDate() + this.plant.days_water);
      console.log(waterDate);
      if (waterDate < curDate) {
        this.remaining_water_days = 0;
      } else {
        this.remaining_water_days =
          new Date(waterDate.getTime() - curDate.getTime()).getDate() - 1;
      }
    } else {
      this.remaining_water_days = 0;
    }
  }
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
