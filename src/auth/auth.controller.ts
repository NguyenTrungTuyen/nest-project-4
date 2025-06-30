import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiConsumes('application/x-www-form-urlencoded')
   @ApiBody({
     description: 'Login with email and password',
     type: CreateAuthDto,
   })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto.username, createAuthDto.password);
  }
}
