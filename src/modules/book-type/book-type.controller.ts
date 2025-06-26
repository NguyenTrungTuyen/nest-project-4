import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookTypeService } from './book-type.service';
import { CreateBookTypeDto } from './dto/create-book-type.dto';
import { UpdateBookTypeDto } from './dto/update-book-type.dto';

@Controller('book-type')
export class BookTypeController {
  constructor(private readonly bookTypeService: BookTypeService) {}

  @Post()
  create(@Body() createBookTypeDto: CreateBookTypeDto) {
    return this.bookTypeService.create(createBookTypeDto);
  }

  @Get()
  findAll() {
    return this.bookTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookTypeDto: UpdateBookTypeDto) {
    return this.bookTypeService.update(+id, updateBookTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookTypeService.remove(+id);
  }
}
