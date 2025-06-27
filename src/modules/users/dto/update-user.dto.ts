import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsPhoneNumber, IsMongoId, IsOptional } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: '685e43b30c7e8e6ee2d2e10f'})
  @IsMongoId({message: "Invalid Id! "})
  @IsNotEmpty({message: "Id must not be empty! "})
  _id : string;

  @ApiProperty({ example: 'Nguyễn Văn A', required: false  })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '0912345678', required: false  })
  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Invalid phone number!' })
  phone?: string;

  @ApiProperty({ example: 'Hà Nội', required: false  })
  @IsOptional()
  address: string;

  @ApiProperty({ example: 'avatar.jpg', required: false  })
  @IsOptional()
  image?: string;
}
