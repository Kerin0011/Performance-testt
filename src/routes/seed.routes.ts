import { Router } from 'express';
import multer from 'multer';
import { seedFromFile } from '../controllers/seed.controller';
import { authenticate, authorizeRole } from '../middlewares/auth';

const upload = multer({ dest: './tmp' });
const router = Router();

router.post('/', authenticate, authorizeRole('ADMIN'), upload.single('file'), seedFromFile);

export default router;