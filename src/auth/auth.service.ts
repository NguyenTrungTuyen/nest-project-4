import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { comparePasswordHelper } from 'src/hash pass/utils';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
       throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
    console.log("Đăng nhập thành công!");

    const payload = { sub:user._id, username: user.email};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }
}
