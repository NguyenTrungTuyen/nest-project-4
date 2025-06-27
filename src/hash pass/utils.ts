import * as bcrypt from 'bcrypt';
import { hash } from 'crypto';
const saltOrRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltOrRounds);
    } catch (error) {
        console.log(error)
         throw new Error('Hashing password failed');
    }
}

export const comparePasswordHelper = async (plainPassword: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashPassword);
    } catch (error) {
        console.log(error)
    }
}





