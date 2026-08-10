import { Router } from 'express';
import { register, login, logout, getMe, updateProfile, addAddress, createAdmin } from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); // Clears the httpOnly cookie
router.get('/me', auth(), getMe);
router.patch('/me', auth(), updateProfile);
router.post('/me/addresses', auth(), addAddress);
router.post('/admin', auth('super_admin', 'admin'), createAdmin);

export default router;
