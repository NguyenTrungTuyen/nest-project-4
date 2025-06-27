import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { BookTypeModule } from './modules/book-type/book-type.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BookModule,
    BookTypeModule, 
    
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
