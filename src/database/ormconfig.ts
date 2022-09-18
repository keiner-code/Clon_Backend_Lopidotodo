import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '1234',
  database: 'lopidotodo',
  logging: true,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
});
