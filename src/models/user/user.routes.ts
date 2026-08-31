import { Router } from 'express';
import UserController from './user.controller';

const router = Router();

router.post('/register', UserController.register.bind(UserController));
router.post('/login', UserController.login.bind(UserController));

export default router;