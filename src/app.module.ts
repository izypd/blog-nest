import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './modules/note/note.module';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { ImgModule } from './modules/img/img.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from './config';

@Module({
  imports: [
    // 配置
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块
      load: [envConfig], // 加载配置
      ignoreEnvFile: true, // 禁止加载 .env 文件
    }),
    // 使用 TypeORM 配置数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 引入 ConfigModule
      inject: [ConfigService], // 注入 ConfigService
      useFactory: (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG'), // 获取配置信息
    }),
    NoteModule,
    UserModule,
    TagModule,
    ImgModule,
  ],
})
export class AppModule {}
