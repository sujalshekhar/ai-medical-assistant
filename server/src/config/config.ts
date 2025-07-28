import dotenv from 'dotenv';
dotenv.config();

function required(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value;
}

export const config = {
  port: parseInt(required('PORT', '5000')),
};
