import Warehouse, { WarehouseCreationAttributes } from "./warehouse.model";

export class WarehouseService {
  async create(data: WarehouseCreationAttributes): Promise<Warehouse> {
    return Warehouse.create(data);
  }

  async list(): Promise<Warehouse[]> {
    return Warehouse.findAll({ where: { deleted: false } });
  }

  async findById(id: string): Promise<Warehouse | null> {
    return Warehouse.findByPk(id);
  }

  async update(
    id: string,
    data: Partial<Omit<WarehouseCreationAttributes, "id">>,
  ): Promise<Warehouse | null> {
    const w = await Warehouse.findByPk(id);
    if (!w) return null;
    await w.update(data);
    return w;
  }

  async softDelete(id: string): Promise<Warehouse | null> {
    const w = await Warehouse.findByPk(id);
    if (!w) return null;
    w.deleted = true;
    await w.save();
    return w;
  }
}

export default new WarehouseService();
