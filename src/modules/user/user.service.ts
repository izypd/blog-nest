import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from '~/common/util/crypto.util';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 校验注册信息
  async checkRegisterForm(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.passwordRepeat) {
      throw new BadRequestException('两次输入的密码不一致，请检查');
    }
    const { username } = registerDto;
    const hasUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    if (hasUser) {
      throw new BadRequestException('您想注册的用户名已存在');
    }
  }

  // 注册
  async register(registerDto: RegisterDto) {
    await this.checkRegisterForm(registerDto);

    const { username, password } = registerDto;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码

    const hashPasswordUser: User = new User();
    hashPasswordUser.username = username;
    hashPasswordUser.password = hashPassword;
    hashPasswordUser.salt = salt;
    await this.userRepository.save(hashPasswordUser);
    return {
      info: '成功注册用户',
    };
  }

  // 校验登录信息
  async checkLoginForm(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不存在');
    }

    const { password: hashPassword, salt } = user;
    const computedHashPassword = encryptPassword(password, salt);
    if (computedHashPassword !== hashPassword) {
      throw new BadRequestException('用户名与密码不对应');
    }

    return user;
  }

  // 生成 token
  async certificate(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDto: LoginDto) {
    const user = await this.checkLoginForm(loginDto);
    const token = await this.certificate(user);

    return {
      info: {
        token,
      },
    };
  }

  async auth() {
    return {
      info: '能进入管理系统',
    };
  }
}
