import { Router } from 'express';
import { createCoupon, getCoupons, validateCoupon } from '../controllers/coupon.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth(), getCoupons);
router.post('/', auth('super_admin', 'admin'), createCoupon);
router.post('/validate', auth(), validateCoupon);

export default router;
