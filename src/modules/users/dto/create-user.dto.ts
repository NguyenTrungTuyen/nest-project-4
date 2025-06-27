import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;

  @ApiProperty({ example: '0912345678' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiProperty({ example: 'Hà Nội' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @ApiProperty({ example: 'avatar.jpg' })
  @IsNotEmpty({ message: 'Ảnh không được để trống' })
  image: string;
}
