import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, CLOUD_NAME, API_KEY, API_SECRET, DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } =
  process.env;
