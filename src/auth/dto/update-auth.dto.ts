import { PartialType } from '@nestjs/swagger';
import { LogintAuthDto } from './login-auth.dto';

export class UpdateAuthDto extends PartialType(LogintAuthDto) {}
