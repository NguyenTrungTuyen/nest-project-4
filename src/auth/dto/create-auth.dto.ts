import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ example: 'Your email' })
    @IsNotEmpty({message:"usename must be not empty!"})
    username:string;

    @ApiProperty({ example: 'Password' })
    @IsNotEmpty({message:"password must be not empty!"})
    password: string;

}
