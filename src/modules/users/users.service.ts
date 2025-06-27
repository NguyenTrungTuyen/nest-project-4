import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schemas/user.schema';
import { hash } from 'crypto';
import { hashPasswordHelper } from 'src/hash pass/utils';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //check email
   isEmailExit = async(email : string) => {
    const user = await this.userModel.exists({email});
    if(user) {
      console.log(`Email: ${email} đã được sử dụng!`);
      return true;
    }
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const {name, email, password, phone, address, image} = createUserDto;
    // check mail
    const isExit = await this.isEmailExit(email);
    if (isExit === true){
      throw new BadRequestException(`Email exit: ${email}. Please use another email!`);
    }
    //hash pword
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name, email, password: hashPassword, phone, address, image
    })

    return {
      _id: user._id
    };
  }

  async findAll(query: string , current: number, pageSize: number) {
    const {filter, sort} = aqp(query);

    if(filter.current) delete filter.current;
    if(filter.pageSize) delete filter.pageSize;

    if(!current) current=1;
    if(!pageSize) pageSize=10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1)*(pageSize);

    const results = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip) // bỏ show password
    .select("-password")
    .sort(sort as any);

    return {results, totalPages};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
