import { Config } from './config.interface';
import developmentConfig from './development.config';
import productionConfig from './production.config';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};

const env = process.env.NODE_ENV || 'development';
export default (): Config => configs[env];
