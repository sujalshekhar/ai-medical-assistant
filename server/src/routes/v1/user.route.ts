import express from 'express';
import { createUserController, getUserController, loginUserController } from '../../controllers/user.controller';
import { validateUser } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', createUserController);
router.post('/login', loginUserController);
router.get('/', validateUser , getUserController);

export default router;
