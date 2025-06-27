import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class FilterDto {
  @ApiProperty({ example: '1', description: 'Trang hiện tại' })
  @IsOptional()
  @IsNumberString()
  current?: string;

  @ApiProperty({ example: '10', description: 'Số phần tử mỗi trang' })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;

  @ApiProperty({ example: '-createdAt', description: 'Sắp xếp kết quả theo trường' })
  @IsOptional()
  sort?: string;
}
