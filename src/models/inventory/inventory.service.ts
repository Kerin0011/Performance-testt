import Inventory from "./inventory.model";

export class InventoryService {
  async createOrUpdate(
    warehouseId: string,
    medicationId: string,
    quantity: number,
  ) {
    const existing = await Inventory.findOne({
      where: { warehouseId, medicationId },
    });
    if (existing) {
      existing.quantity = existing.quantity + quantity;
      await existing.save();
      return existing;
    }
    return Inventory.create({ warehouseId, medicationId, quantity } as any);
  }

  async find(warehouseId: string, medicationId: string) {
    return Inventory.findOne({ where: { warehouseId, medicationId } });
  }
}

export default new InventoryService();
