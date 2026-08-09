import { Router } from 'express';
import { createReview, getReviews, approveReview } from '../controllers/review.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth(), getReviews);
router.post('/', auth(), createReview);
router.patch('/:id/approve', auth('super_admin', 'admin', 'editor'), approveReview);

export default router;
