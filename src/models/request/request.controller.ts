import { Request, Response } from "express";
import requestService from "./request.service";

export class RequestController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { clinicId, medicationId, quantity, warehouseId } = req.body;
      const request = await requestService.create({
        clinicId,
        medicationId,
        quantity,
        warehouseId,
      });
      res.status(201).json(request);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error" });
    }
  }

  async list(_req: Request, res: Response): Promise<void> {
    try {
      const items = await requestService.list();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updated = await requestService.updateStatus(id, req.body.status);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async assign(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updated = await requestService.assignToWarehouse(
        id,
        req.body.warehouseId,
      );
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const r = await requestService.findById(id);
      if (!r) {
        res.status(404).json({ message: "Not found" });
        return;
      }
      r.deleted = true;
      await r.save();
      res.json({ message: "Deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Server error" });
    }
  }
}

export default new RequestController();
