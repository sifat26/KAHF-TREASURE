import { Router } from 'express';
import { uploadImage } from '../config/multer';
import { uploadImages, uploadSingleImage } from '../controllers/upload.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/images', auth('super_admin', 'admin', 'editor'), uploadImage.array('images', 10), uploadImages);
router.post('/image', auth('super_admin', 'admin', 'editor'), uploadImage.single('image'), uploadSingleImage);

export default router;
