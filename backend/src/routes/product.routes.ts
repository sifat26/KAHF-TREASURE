import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth('super_admin', 'admin', 'editor'), createProduct);
router.patch('/:id', auth('super_admin', 'admin', 'editor'), updateProduct);
router.delete('/:id', auth('super_admin', 'admin'), deleteProduct);

export default router;
