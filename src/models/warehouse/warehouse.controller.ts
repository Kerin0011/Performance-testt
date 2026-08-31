import { Request, Response } from 'express';
import warehouseService from './warehouse.service';

export class WarehouseController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, location } = req.body;
      const warehouse = await warehouseService.create({ name, location });
      res.status(201).json(warehouse);
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }

  async list(_req: Request, res: Response): Promise<void> {
    try {
      const items = await warehouseService.list();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const item = await warehouseService.findById(id);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updated = await warehouseService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const removed = await warehouseService.softDelete(id);
      if (!removed) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json({ message: 'Deleted' });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
}

export default new WarehouseController();