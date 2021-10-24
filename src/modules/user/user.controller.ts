import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto, LoginDto } from './user.dto';
import { UserService } from './user.service';
import { TokenResponse, TokenVo } from './user.vo';
import { FeedbackInfoVo, FeedbackInfoResponse } from '~/common/vo';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: '注册', type: FeedbackInfoResponse })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<FeedbackInfoVo> {
    return await this.userService.register(registerDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenVo> {
    return await this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '能否进入管理系统',
    type: FeedbackInfoResponse,
  })
  @Get('auth')
  async auth(): Promise<FeedbackInfoVo> {
    return await this.userService.auth();
  }
}
