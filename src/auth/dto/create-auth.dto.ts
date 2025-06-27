import { IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty({message:"usename must be not empty!"})
    username:string;

    @IsNotEmpty({message:"password must be not empty!"})
    password: string;

}
