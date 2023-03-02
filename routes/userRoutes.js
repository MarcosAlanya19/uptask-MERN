import { Router } from 'express';
import { autenticate, confirm, forgetPassword, newPassword, profile, register, verifyToken } from '../controllers/userController.js';
import { checkAuth } from '../middleware/checkAuth.js';

export const router = Router()

// Autenticacion, Registro y confirmacion de usuarios
router.post("/", register)
router.post("/login", autenticate)
router.get('/confirm/:token', confirm)
router.post('/forget-password', forgetPassword)
router.route('/forget-password/:token')
  .get(verifyToken)
  .post(newPassword);

router.get('/profile', checkAuth, profile)
