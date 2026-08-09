import { Router } from 'express';
import { createBanner, getBanners, updateBanner, deleteBanner } from '../controllers/banner.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth(), getBanners);
router.post('/', auth('super_admin', 'admin'), createBanner);
router.patch('/:id', auth('super_admin', 'admin'), updateBanner);
router.delete('/:id', auth('super_admin', 'admin'), deleteBanner);

export default router;
