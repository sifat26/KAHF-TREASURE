import { Router } from 'express';
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', auth('super_admin', 'admin', 'editor'), createCategory);
router.patch('/:id', auth('super_admin', 'admin', 'editor'), updateCategory);
router.delete('/:id', auth('super_admin', 'admin'), deleteCategory);

export default router;
