import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilterDto } from './dto/filter.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log('information input:',createUserDto );
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
