import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/users/users.module';
import { BookModule } from './modules/book/book.module';
import { BookTypeModule } from './modules/book-type/book-type.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from './common/middleware/verify_access_token';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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

     MailerModule.forRootAsync({

       imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
        host: 'smtp.gmail.com',// địa chỉ máy chủ SMTP
        port: 465,// cổng máy chủ SMTP, mặc định là 1025 cho MailDev
        // ignoreTLS: true,
        secure: true,
        auth: {
          user: configService.get<string>('MAIL_USER'),
          pass: configService.get<string>('MAIL_PASSWORD'),
        },
         tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
          },
       
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      }),
      inject: [ConfigService],

    
      // preview: true,
      // template: {
      //   dir: process.cwd() + '/template/',
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
        

  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'users', method: RequestMethod.PUT}); // kiểm tra đăng nhập để update thông user
  }
}
