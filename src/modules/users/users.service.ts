import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schemas/user.schema';
import { hash } from 'crypto';
import { hashPasswordHelper } from 'src/common/untils/utils';
import aqp from 'api-query-params';
import { FilterDto } from './dto/filter.dto';
import mongoose from 'mongoose';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';


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

  // ============không dùng DTO!!!===========
  // async findAll(query: string , current: number, pageSize: number) {
  //   const {filter, sort} = aqp(query);

  //   if(filter.current) delete filter.current;
  //   if(filter.pageSize) delete filter.pageSize;

  //   if(!current) current=1;
  //   if(!pageSize) pageSize=10;

  //   const totalItems = (await this.userModel.find(filter)).length;
  //   const totalPages = Math.ceil(totalItems / pageSize);

  //   const skip = (current - 1)*(pageSize);

  //   const results = await this.userModel
  //   .find(filter)
  //   .limit(pageSize)
  //   .skip(skip) // bỏ show password
  //   .select("-password")
  //   .sort(sort as any);

  //   return {results, totalPages};
  // }

// =============Có dùng DTO==
async findAll(filterDto: FilterDto) {
  const { filter, sort } = aqp(filterDto);

  const current = Number(filter.current) || 1;
  const pageSize = Number(filter.pageSize) || 10;

  delete filter.current;
  delete filter.pageSize;

  // const totalItems = await this.userModel.countDocuments(filter); // 1s
  const skip = (current - 1) * pageSize;
  
  // const results = await this.userModel
  //   .find(filter)
  //   .limit(pageSize)
  //   .skip(skip)
  //   .select('-password')
  //   .sort(sort as any); //2s

    const [results, totalItems] = await Promise.all([
      
    this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .select('-password')
    .sort(sort as any),

    this.userModel.countDocuments(filter)
  ])
  const totalPages = Math.ceil(totalItems / pageSize);

  return { results, totalPages };
}


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async findByEmail (email: string){
    return await this.userModel.findOne({email})
  }

   async update( updateUserDto: UpdateUserDto) {
      const { _id, ...rest } = updateUserDto;
      const updateData = Object.fromEntries(
        Object.entries(rest).filter(([_, v]) => v !== undefined && v !== null)
      );
      const result =  await this.userModel.updateOne({ _id }, updateData);
      
      if (result.matchedCount === 0) {
        throw new NotFoundException(`User with ID ${_id} not found`);
      }
      console.log("Updated!");
      return ('Update successful!');
      

    // return await this.userModel.updateOne(
    //   {_id: updateUserDto._id}, {...updateUserDto}
    // );
  }

  async remove(_id: string) {
    // check id
    if(mongoose.isValidObjectId(_id)){
      console.log("Deleted!");
      return this.userModel.deleteOne({_id})
    }else{
      throw new BadRequestException("Invalid Id!")
    }
   
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const {name, email, password} = registerDto;
    // check mail
    const isExit = await this.isEmailExit(email);
    if (isExit === true){
      throw new BadRequestException(`Email exit: ${email}. Please use another email!`);
    }
    //hash pword
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name, email, password: hashPassword, 
      isActive: false, // mặc định là false
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'minutes'), // hết hạn sau 1p

    })

    //thong báo đăng ký thành công
    console.log("Đăng ký thành công!");
    return user._id;

    //send email


  }
}


