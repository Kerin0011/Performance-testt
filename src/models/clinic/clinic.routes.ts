import { Router } from 'express';
import ClinicController from './clinic.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate, authorizeRole('ADMIN'), ClinicController.create.bind(ClinicController));
router.get('/', authenticate, ClinicController.list.bind(ClinicController));
router.get('/:id', authenticate, ClinicController.get.bind(ClinicController));
router.get('/:id/requests', authenticate, ClinicController.requests.bind(ClinicController));
router.patch('/:id', authenticate, authorizeRole('ADMIN'), ClinicController.update.bind(ClinicController));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), ClinicController.remove.bind(ClinicController));

export default router;