import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/users/users.module';
import { BookModule } from './modules/book/book.module';
import { BookTypeModule } from './modules/book-type/book-type.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BookModule,
    BookTypeModule, 
    MulterModule.register({dest: './uploads'}), // dung de luu file

    
    ConfigModule.forRoot({isGlobal: true}),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
        

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
