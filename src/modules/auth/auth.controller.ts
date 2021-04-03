import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorator/user.decorator';
import { AccessToken } from '../encryption/interface/access-token.interface';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiCreatedResponse({
    description: 'User was successfully signed up',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
  })
  @Post('signup')
  async signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<AccessToken> {
    return this.authService.signUp(userCredentialsDto);
  }

  @ApiOkResponse({
    description: 'User was successfully signed in',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@GetUser() user: User): Promise<AccessToken> {
    return this.authService.getAccessToken(user);
  }
}
