import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
  // connectionString: process.env.DATABASE_URL,
  // ssl: {
  //     rejectUnauthorized: false
  // }
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'linkr',
};

const connection = new Pool(databaseConfig);

export default connection;
