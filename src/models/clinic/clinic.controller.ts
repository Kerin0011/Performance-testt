import { Request, Response } from 'express';
import clinicService from './clinic.service';
import requestService from '../request/request.service';

export class ClinicController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, nit, contact } = req.body;
      const exists = await clinicService.findByNit(nit);
      if (exists) {
        res.status(409).json({ message: 'Clinic with this NIT already exists' });
        return;
      }
      const clinic = await clinicService.create({ name, nit, contact });
      res.status(201).json(clinic);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async list(_req: Request, res: Response): Promise<void> {
    try {
      const clinics = await clinicService.list();
      res.json(clinics);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const clinic = await clinicService.findById(id);
      if (!clinic) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(clinic);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async requests(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const clinic = await clinicService.findById(id);
      if (!clinic) {
        res.status(404).json({ message: 'Clinic not found' });
        return;
      }
      const items = await requestService.getByClinic(id);
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updated = await clinicService.update(id, req.body);
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
      const removed = await clinicService.softDelete(id);
      if (!removed) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json({ message: 'Deleted' });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
}

export default new ClinicController();