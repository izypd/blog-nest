export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3001,
    // 静态文件路径 localhost:3001/static/upload/xxx.jpg
    uploadStaticSrc: 'upload',
  },

  // swagger 配置
  SWAGGER_CONFIG: {
    enableSwagger: false,
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '888888',
    database: 'blog',
    entities: ['dist/modules/*/*.entity{.ts,.js}'],
    synchronize: true,
    charset: 'utf8mb4',
    logging: true,
  },

  // JWT 配置
  JWT_CONFIG: {
    secret: 'fnugfsbo', // Jwt密码
    signOptions: {
      expiresIn: '100y', // token 过期时效
    },
  },
};
