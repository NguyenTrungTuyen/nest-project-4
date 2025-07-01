import { Controller, Get, Post, Body, UseGuards, Request  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogintAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly mailerService: MailerService



  ) { }

  @Post('login')// ko dung local strategy
  @ApiOperation({ summary: 'Login' })
  @ApiConsumes('application/x-www-form-urlencoded')
   @ApiBody({
     description: 'Login with email and password',
     type: LogintAuthDto,
   })
  create(@Body() LogintAuthDto: LogintAuthDto) {
    return this.authService.signIn(LogintAuthDto.username, LogintAuthDto.password);
  }


  @Post('login2')////.sử dụng auth guard, su dụng local strategy
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    description: 'Login with email and password',
    type: LogintAuthDto,
  })
  @Public()// public route, ko cần đăng nhập
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public() // public route, ko cần đăng nhập
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }


   @Get('mail')
  @Public() // public route, ko cần đăng nhập
  testMail() {
        this.mailerService
      .sendMail({
        to: 'tn1481482004@gmail.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        text: 'This is a test mail sent from NestJS MailerModule',
        html: '<b>This is a test mail sent from NestJS MailerModule</b>',
      })
    return "Test mail sent successfully!";
  }

}
