import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
