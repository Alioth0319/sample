import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();


const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 20103,
  username: 'postgres',
  password: '20020103',
  database: 'DatabaseT',
  synchronize: false,
  entities: ['src/database/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;