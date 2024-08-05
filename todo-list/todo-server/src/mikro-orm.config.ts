// import { MikroORM } from '@mikro-orm/mysql';
import { Item } from './entities/items.entity';

export default {
  entities: [Item],
  dbName: process.env.DB_NAME,
  type: 'mysql',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
};
