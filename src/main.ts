import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const port = process.env.PORT ?? 8000;
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

   app.useGlobalPipes(new ValidationPipe({
     whitelist: true, // Loại bỏ các thuộc tính không có trong DTO.
     forbidNonWhitelisted: true, //Ném lỗi nếu có thuộc tính không mong muốn.
   }));

  // app.setGlobalPrefix('api/v1', { exclude: ['']}); // xet tien to, trừ route gốc /.

  const config = new DocumentBuilder()
  .setTitle('API tài liệu')            // Tiêu đề
  .setDescription('Tài liệu API cho dự án NestJS') // Mô tả
  .setVersion('1.0')                   // Version
  .addBearerAuth()   
  .addTag("Authentication", "Đăng nhập, đăng ký")            
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Đường dẫn: /swagger

  await app.listen(port);
  console.log(`Server is running at http://localhost:${port}`);

}
bootstrap();
