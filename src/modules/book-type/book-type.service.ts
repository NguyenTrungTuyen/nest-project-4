import { Injectable } from '@nestjs/common';
import { CreateBookTypeDto } from './dto/create-book-type.dto';
import { UpdateBookTypeDto } from './dto/update-book-type.dto';

@Injectable()
export class BookTypeService {
  create(createBookTypeDto: CreateBookTypeDto) {
    return 'This action adds a new bookType';
  }

  findAll() {
    return `This action returns all bookType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookType`;
  }

  update(id: number, updateBookTypeDto: UpdateBookTypeDto) {
    return `This action updates a #${id} bookType`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookType`;
  }
}
