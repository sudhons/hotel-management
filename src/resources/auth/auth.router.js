import { Router } from 'express';
import AuthController from './auth.controller';
import asyncHandler from '../../middlewares/asyncHandler';
import { validatorHandler } from '../../middlewares/validatorHandler';
import { registerSchema, loginSchema } from './auth.validator';

const router = Router();

router.post(
  '/register',
  validatorHandler(registerSchema),
  asyncHandler(AuthController.register)
);

router.post(
  '/login',
  validatorHandler(loginSchema),
  asyncHandler(AuthController.login)
);

export default router;
