import { Request, Response } from 'express';
import medicationService from './medication.service';

export class MedicationController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, code } = req.body;
      const exists = await medicationService.findByCode(code);
      if (exists) {
        res.status(409).json({ message: 'Medication with this code already exists' });
        return;
      }
      const med = await medicationService.create({ name, code });
      res.status(201).json(med);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async list(_req: Request, res: Response): Promise<void> {
    try {
      const items = await medicationService.list();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const item = await medicationService.findById(id);
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
      const updated = await medicationService.update(id, req.body);
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
      const removed = await medicationService.softDelete(id);
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

export default new MedicationController();