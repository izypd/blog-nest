import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { regUsername, regPassword } from '~/common/constant/regex.constant';

export class LoginDto {
  @ApiProperty({
    description: '用户名，唯一',
    example: 'username',
  })
  @Matches(regUsername, { message: '用户名应由3~16位字母，数字或下划线组成' })
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString({ message: '用户名应为 String 类型' })
  readonly username: string;

  @ApiProperty({
    description: '密码',
    example: '12345678',
  })
  @Matches(regPassword, {
    message:
      '密码应为8~16位，且至少包括1个大写字母，1个小写字母，1个数字，1个特殊字符',
  })
  @IsNotEmpty({ message: '请输入密码' })
  @IsString({ message: '密码应为 String 类型' })
  readonly password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: '再次输入密码确认',
    example: '12345678',
  })
  @IsNotEmpty({ message: '请再次输入密码确认' })
  readonly passwordRepeat: string;
}
