import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    UsersModule, PassportModule,
    JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    global: true,
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
    },
  }),
  inject: [ConfigService],
}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
