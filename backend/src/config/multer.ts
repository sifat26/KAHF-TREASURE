import multer from 'multer';
import path from 'path';
import config from './index';

const imageFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Use memory storage so we can upload buffer directly to Cloudinary
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.max_file_size },
  fileFilter: imageFilter,
});
