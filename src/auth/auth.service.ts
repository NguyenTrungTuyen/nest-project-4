import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { comparePasswordHelper } from 'src/common/untils/utils';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if(!user){
     return null; // Nếu không tìm thấy người dùng, trả về null
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password)
    
    if (!isValidPassword) {
       throw new UnauthorizedException('invalid password!');
    }

    console.log("Đăng nhập thành công!");
    return user; // Trả về thông tin người dùng đã xác thực thành công
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }



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

  handleRegister = async (registerDto : CreateAuthDto) => {
   return await this.usersService.handleRegister(registerDto);
  }
}
