import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

interface Config {
  port: string | undefined;
  database_url: string | undefined;
  bcrypt_salt_rounds: string | undefined;
  jwt_secret: string | undefined;
  node_env: string | undefined;
}

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  node_env: process.env.NODE_ENV,
} as Config;