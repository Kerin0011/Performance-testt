'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Admin', email: 'admin@local', password, role: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Manager', email: 'manager@local', password, role: 'MANAGER', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('clinics', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Clinic A', nit: 'NIT-100', contact: 'contact@a', deleted: false, createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Clinic B', nit: 'NIT-200', contact: 'contact@b', deleted: false, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('warehouses', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Main Warehouse', location: 'City Center', deleted: false, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('medications', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Paracetamol', code: 'MED-001', deleted: false, createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Ibuprofen', code: 'MED-002', deleted: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
    
    const warehouses = await queryInterface.sequelize.query(`SELECT id FROM warehouses LIMIT 1;`);
    const meds = await queryInterface.sequelize.query(`SELECT id FROM medications;`);
    const warehouseId = warehouses[0][0].id;
    const medRows = meds[0];
    const inventory = medRows.map(m => ({ id: Sequelize.literal('gen_random_uuid()'), warehouseId, medicationId: m.id, quantity: 100, createdAt: new Date(), updatedAt: new Date() }));
    await queryInterface.bulkInsert('inventories', inventory);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventories', null, {});
    await queryInterface.bulkDelete('medications', null, {});
    await queryInterface.bulkDelete('warehouses', null, {});
    await queryInterface.bulkDelete('clinics', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
