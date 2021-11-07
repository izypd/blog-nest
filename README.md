<p align="center">
  <a href="https://izypd.com">
    <img width="100" src="https://cdn.jsdelivr.net/gh/izypd/Gauss@main/blog/favicon.svg">
  </a>
</p>

<h1 align="center">言语之庭</h1>

<div align="center">

使用 [NestJS](https://nestjs.com), [TypeScript](https://www.typescriptlang.org), [MySQL](https://www.mysql.com), 及 [JSON Web Token](https://jwt.io) 开发的博客 RESTful API 后端，博客网址 https://izypd.com 。

[![NestJS](https://img.shields.io/badge/Made%20With-NestJS-d32a51?style=for-the-badge&labelColor=0e0e10)](https://nestjs.com)
[![Node Version](https://img.shields.io/badge/node-LTS-6f9e67?style=for-the-badge)](https://nodejs.org)
[![Code Style](https://img.shields.io/badge/Code%20Style-Prettier-c097c8?style=for-the-badge)](https://prettier.io)
[![PR Welcome](https://img.shields.io/badge/PR-welcome-60ca2b?style=for-the-badge)](https://github.com/izypd/blog-react/pulls)
[![License](https://img.shields.io/badge/License-GPL-60ca2b?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0.html)

</div>

## 🤝 相关项目

- **与这个项目配套的前端:** [blog-react](https://github.com/izypd/blog-react), powered by [React](https://reactjs.org)

## ✨ 特性

- 🚀 [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) API
- 👦 用户管理，采用JWT认证
- 🔖 标签管理
- 🎭 图片管理
- 📝 [Swagger](https://swagger.io) API 文档

## 开发

示例采用 [pnpm](https://pnpm.io) ，与 yarn 类似

```bash
$ git clone https://github.com/izypd/blog-nest.git
$ cd blog-nest
# 安装依赖
$ pnpm i
# 支持热更新的开发服务器，运行在 localhost:3001
$ pnpm start:dev
# 编译
$ pnpm build
# 运行编译好的文件，运行在 localhost:3001
$ pnpm start:prod
# 使用 eslint 检查并修复代码
$ pnpm lint
```

## 更新记录
[CHANGELOG.md](https://github.com/izypd/blog-nest/blob/main/CHANGELOG.md)