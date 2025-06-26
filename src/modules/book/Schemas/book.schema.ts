import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({  })
  slug: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  order: number;

  // Gợi ý thêm:
  @Prop({ type: Types.ObjectId, ref: 'BookType' }) 
  bookTypeId: Types.ObjectId;

  @Prop({ })
  authors: string[];

  @Prop()
  publisher: string;

  @Prop()
  publishedYear: number;

  @Prop()
  price: number;

  @Prop()
  isbn: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
