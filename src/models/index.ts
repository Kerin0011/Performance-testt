import sequelize from '../config/sequelize';

import User from './user/user.model';
import Clinic from './clinic/clinic.model';
import Warehouse from './warehouse/warehouse.model';
import Medication from './medication/medication.model';
import Inventory from './inventory/inventory.model';
import RequestModel from './request/request.model';

Warehouse.hasMany(Inventory, { foreignKey: 'warehouseId' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

Medication.hasMany(Inventory, { foreignKey: 'medicationId' });
Inventory.belongsTo(Medication, { foreignKey: 'medicationId' });

Clinic.hasMany(RequestModel, { foreignKey: 'clinicId' });
RequestModel.belongsTo(Clinic, { foreignKey: 'clinicId' });

Medication.hasMany(RequestModel, { foreignKey: 'medicationId' });
RequestModel.belongsTo(Medication, { foreignKey: 'medicationId' });

Warehouse.hasMany(RequestModel, { foreignKey: 'warehouseId' });
RequestModel.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

export async function syncModels() {
  await sequelize.sync();
}

export {
  User,
  Clinic,
  Warehouse,
  Medication,
  Inventory,
  RequestModel
};