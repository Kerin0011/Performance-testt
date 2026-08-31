import { Request, Response } from 'express';
import fs from 'fs/promises';
import sequelize from '../config/sequelize';
import { User, Clinic, Warehouse, Medication, Inventory, RequestModel } from '../models';

export async function seedFromFile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No se ha subido ningún archivo' });
      return;
    }

    const content = await fs.readFile(req.file.path, 'utf8');
    const data = JSON.parse(content);

    await sequelize.transaction(async (t) => {
      if (data.users && Array.isArray(data.users)) {
        await User.bulkCreate(data.users, { transaction: t });
      }
      if (data.clinics && Array.isArray(data.clinics)) {
        await Clinic.bulkCreate(data.clinics, { transaction: t });
      }
      if (data.warehouses && Array.isArray(data.warehouses)) {
        await Warehouse.bulkCreate(data.warehouses, { transaction: t });
      }
      if (data.medications && Array.isArray(data.medications)) {
        await Medication.bulkCreate(data.medications, { transaction: t });
      }
      if (data.inventories && Array.isArray(data.inventories)) {
        await Inventory.bulkCreate(data.inventories, { transaction: t });
      }
      if (data.requests && Array.isArray(data.requests)) {
        await RequestModel.bulkCreate(data.requests, { transaction: t });
      }
    });

    await fs.unlink(req.file.path).catch(() => {});

    res.json({ message: 'Seed ejecutado exitosamente' });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error procesando el archivo' });
  }
}