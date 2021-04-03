import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../user-role/user-role.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  @Type(() => UserRole)
  @Transform((user_role) => user_role.value.key)
  user_role: UserRole;

  @Exclude()
  @Column()
  user_role_id: number;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty()
  @Column({ default: true })
  notifications: boolean;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
