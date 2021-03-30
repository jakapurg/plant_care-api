import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator/user.decorator';
import { AccessToken } from '../encryption/interface/access-token.interface';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<AccessToken> {
    return this.authService.signUp(userCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@GetUser() user: User): Promise<AccessToken> {
    console.log(user);
    return this.authService.getAccessToken(user);
  }
}
