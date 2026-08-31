import { Router } from 'express';

const router = Router();


import userRoutes from '../models/user/user.routes';
import clinicRoutes from '../models/clinic/clinic.routes';
import warehouseRoutes from '../models/warehouse/warehouse.routes';
import medicationRoutes from '../models/medication/medication.routes';
import requestRoutes from '../models/request/request.routes';
import seedRoutes from './seed.routes';

router.use('/users', userRoutes);
router.use('/clinics', clinicRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/medications', medicationRoutes);
router.use('/requests', requestRoutes);
router.use('/seed', seedRoutes);

export default router;
