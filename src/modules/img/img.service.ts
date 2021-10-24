import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { getPagination } from '~/common/util/pagination.util';
import { Repository } from 'typeorm';
import { CreateImgDto } from './img.dto';
import { Img } from './img.entity';
import { ImgInfoVo } from './img.dto';
import * as fs from 'fs';
import { getMD5 } from '~/common/util/crypto.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImgService {
  constructor(
    @InjectRepository(Img)
    private readonly imgRepository: Repository<Img>,
    private readonly configService: ConfigService,
  ) {}

  async getImgList(pageDto: PageDto) {
    const { page, pageSize } = pageDto;
    const listAndTotal = await this.imgRepository
      .createQueryBuilder('img')
      .select(['img.src'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = listAndTotal;
    const pagination = getPagination(total, pageSize, page);

    return {
      list,
      pagination,
    };
  }

  async createImg(createImgDto: CreateImgDto): Promise<ImgInfoVo> {
    const img = new Img();
    img.src = createImgDto.src;
    img.sign = createImgDto.sign;
    const result = await this.imgRepository.save(img);
    return {
      info: result,
    };
  }

  async getImgBySign(sign: string) {
    return await this.imgRepository
      .createQueryBuilder('img')
      .where('img.sign = :sign', { sign })
      .getOne();
  }

  async uploadImg(file: any) {
    const { buffer } = file;

    const currentSign = getMD5(buffer);
    const hasImg = await this.getImgBySign(currentSign);

    if (hasImg) {
      return {
        info: {
          src: hasImg.src,
          isHas: true,
        },
      };
    }

    const arr = file.originalname.split('.');
    const fileType = arr[arr.length - 1];
    const fileName = currentSign + '.' + fileType;

    const src = `${
      this.configService.get('SERVICE_CONFIG').uploadStaticSrc
    }/${fileName}`;
    fs.writeFileSync(src, buffer);

    this.createImg({ src, sign: currentSign });

    return {
      info: {
        src,
        isHas: false,
      },
    };
  }
}
