import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrderStatus, trackOrder } from '../controllers/order.controller';
import { auth } from '../middlewares/auth';
import { optionalAuth } from '../middlewares/optionalAuth';

const router = Router();

// POST / — guests allowed (optionalAuth); logged-in users get cart cleared automatically
router.post('/', optionalAuth, createOrder);
router.get('/', auth(), getOrders);
router.get('/track/:trackingNumber', trackOrder);
router.get('/:id', auth(), getOrder);
router.patch('/:id/status', auth('super_admin', 'admin', 'editor'), updateOrderStatus);

export default router;
