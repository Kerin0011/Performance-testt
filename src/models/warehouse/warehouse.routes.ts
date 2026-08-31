import { Router } from 'express';
import WarehouseController from './warehouse.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate, authorizeRole('ADMIN'), WarehouseController.create.bind(WarehouseController));
router.get('/', authenticate, WarehouseController.list.bind(WarehouseController));
router.get('/:id', authenticate, WarehouseController.get.bind(WarehouseController));
router.patch('/:id', authenticate, authorizeRole('ADMIN'), WarehouseController.update.bind(WarehouseController));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), WarehouseController.remove.bind(WarehouseController));

export default router;
