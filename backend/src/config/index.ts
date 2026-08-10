import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/kahf_treasure',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expires_in: process.env.JWT_EXPIRES_IN || '7d',
  },
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
  upload_dir: process.env.UPLOAD_DIR || 'uploads',
  max_file_size: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
  },
  cookie: {
    secure: process.env.COOKIE_SECURE
      ? process.env.COOKIE_SECURE === 'true'
      : process.env.FRONTEND_URL?.startsWith('https://'),
    sameSite:
      (process.env.COOKIE_SAMESITE as 'strict' | 'lax' | 'none') ||
      (process.env.FRONTEND_URL?.startsWith('https://') ? 'none' : 'lax'),
    domain: process.env.COOKIE_DOMAIN || undefined,
  },
};
