export const regPositive = /^[1-9]\d*$/;
export const regPositiveOrEmpty = /\s*|^[1-9]\d*$/;
//用户名，3~16位（字母，数字，下划线）
export const regUsername = /^[a-zA-Z0-9_]{3,16}$/;
//密码，8~16位，至少包括1个大写字母，1个小写字母，1个数字，1个特殊字符
export const regPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?.&_-])[\w$@$!%*?.&-]{8,16}/;
