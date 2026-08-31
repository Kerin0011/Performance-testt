import { Router } from 'express';
import MedicationController from './medication.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate, authorizeRole('ADMIN'), MedicationController.create.bind(MedicationController));
router.get('/', authenticate, MedicationController.list.bind(MedicationController));
router.get('/:id', authenticate, MedicationController.get.bind(MedicationController));
router.patch('/:id', authenticate, authorizeRole('ADMIN'), MedicationController.update.bind(MedicationController));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), MedicationController.remove.bind(MedicationController));

export default router;
