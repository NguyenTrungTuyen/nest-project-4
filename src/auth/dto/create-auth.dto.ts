import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ example: 'Your email' })
    @IsNotEmpty({message:"usename must be not empty!"})
    email:string;

    @ApiProperty({ example: 'Password' })
    @IsNotEmpty({message:"password must be not empty!"})
    password: string;

    @ApiProperty({ example: 'Your Name' })
    @IsOptional()
    name?:string;

}
