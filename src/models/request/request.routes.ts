import { Router } from 'express';
import RequestController from './request.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate, RequestController.create.bind(RequestController));
router.get('/', authenticate, RequestController.list.bind(RequestController));
router.patch('/:id/status', authenticate, RequestController.updateStatus.bind(RequestController));
router.post('/:id/assign', authenticate, authorizeRole('ADMIN'), RequestController.assign.bind(RequestController));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), RequestController.remove.bind(RequestController));

export default router;