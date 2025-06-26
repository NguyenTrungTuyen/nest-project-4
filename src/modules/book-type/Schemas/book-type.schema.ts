
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookTypeDocument = HydratedDocument<BookType>;

@Schema({ timestamps: true})
export class BookType {
  @Prop()
  name: string;

  @Prop()
  status: boolean ;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop()
  image: string;

   @Prop()
  order: number;

}

export const UserSchema = SchemaFactory.createForClass(BookType);
