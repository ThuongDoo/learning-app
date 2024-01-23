import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { FacebookAuthGuard, LocalAuthGuard } from './guard';
import { GetUser, Public } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@GetUser() user): Promise<any> {
    return this.authService.login(user);
  }

  @Public()
  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@GetUser() user): Promise<any> {
    return this.authService.login(user);
  }
}
