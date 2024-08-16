// import { MikroORM } from '@mikro-orm/mysql';
import { Item } from './entities/items.entity';
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';

export default defineConfig({
    entities: [Item],
    dbName: 'task_management', 
    user: 'task_user',
    password: 'its-okay',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
});


// export default {
//   entities: [Item],
//   dbName: process.env.DB_NAME,
//   type: 'mysql',
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
// };
