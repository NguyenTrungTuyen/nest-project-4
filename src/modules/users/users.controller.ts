import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FilterDto } from './dto/filter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { unlinkSync } from 'fs';
import { Public } from 'src/decorator/customize';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @Public()// public route, ko cần đăng nhập, giống như @UseGuards(JwtAuthGuard) nhưng không cần đăng nhập
  
  @UseInterceptors(
    FileInterceptor('image', {
       limits: {
        fileSize: 2 * 1024 * 1024, // giới hạn 2MB
      },
       fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Chỉ cho phép file ảnh JPG, PNG, WEBP'),
            false,
          );
        }
        cb(null, true);
      },

      storage: diskStorage({
        destination: './uploads', // Tạo thư mục uploads nếu chưa có
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )

  @ApiOperation({ summary: 'Create new user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
   description: 'Tạo user mới với ảnh đại diện',
   type: CreateUserDto,
 })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
 async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File, // Sử dụng Express.Multer.File để định nghĩa kiểu file
  ) {
    // Kiểm tra email tồn tại
  const isExist = await this.usersService.isEmailExit(createUserDto.email);
  if (isExist) {
    // Nếu file đã được upload, xóa nó
    if (file?.filename) {
    const filePath = join(process.cwd(), 'uploads', file.filename);
    try {
      unlinkSync(filePath);
      console.log('Đã xóa file:', filePath, 'vì email đã tồn tại');
    } catch (err) {
      console.error('Không thể xóa file:', filePath, err.message);
    }
  }
    throw new BadRequestException(`Email đã tồn tại: ${createUserDto.email}`);
  }

    if (file) {
    createUserDto.image = file.filename;
  }
    console.log(
      'Created!',
      'information input:',createUserDto ,
      'file:', file
    );

    return this.usersService.create(createUserDto);
  }

  // không dùng DTO
  // @Get()
  // @ApiOperation({ summary: 'User list' })
  // async findAll( 
  //   @Query() query: string, 
  //   @Query("current") current: string,
  //   @Query("pageSize") pageSize: string,
    
  
  // ) {
  //   return this.usersService.findAll(query, +current, +pageSize);
  // }

  @Get()
  @Public()
  @ApiOperation({ summary: 'User list' })
  async findAll(@Query() filterDto: FilterDto) {
    return this.usersService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }


  @ApiBearerAuth() 
  @Put()
  @ApiOperation({ summary: 'Update user informations ' })
  @ApiResponse({ status: 200, description: 'Câp nhật thành công' })
  @ApiResponse({ status: 400, description: 'Câp nhật thất bại' })
  update(@Body() updateUserDto: UpdateUserDto) {
    console.log('information input:',updateUserDto );
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
