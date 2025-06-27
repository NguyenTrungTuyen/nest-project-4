import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class FilterDto {
  [key: string]: any; //Dòng này nói với TypeScript rằng: "object này có thể có nhiều key dạng string"

  @ApiProperty({ example: '1', description: 'Trang hiện tại', required: false  })
  @IsOptional()
  @IsNumberString()
  current?: string;

  @ApiProperty({ example: '10', description: 'Số phần tử mỗi trang', required: false  })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;

  @ApiProperty({ example: '-createdAt', description: 'Sắp xếp kết quả theo trường' })
  @IsOptional()
  sort?: string;
}
