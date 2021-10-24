import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Img])],
  controllers: [ImgController],
  providers: [ImgService],
})
export class ImgModule {}
