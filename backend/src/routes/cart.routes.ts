import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth(), getCart);
router.post('/items', auth(), addToCart);
router.patch('/items/:itemId', auth(), updateCartItem);
router.delete('/items/:itemId', auth(), removeFromCart);
router.delete('/', auth(), clearCart);

export default router;
