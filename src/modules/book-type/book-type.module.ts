import { Module } from '@nestjs/common';
import { BookTypeService } from './book-type.service';
import { BookTypeController } from './book-type.controller';

@Module({
  controllers: [BookTypeController],
  providers: [BookTypeService],
})
export class BookTypeModule {}
