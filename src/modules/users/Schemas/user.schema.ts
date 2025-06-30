
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: null })
  image: string; // Lưu đường dẫn đến file ảnh

  @Prop({default: 'USER'})
  role: string;

  @Prop({ default:'LOCAL'})
  accountType: string;

  @Prop({default: false})
  isActive: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
