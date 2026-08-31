import RequestModel, {
  RequestCreationAttributes,
  RequestStatus,
} from "./request.model";
import inventoryService from "../inventory/inventory.service";
import sequelize from "../../config/sequelize";
import clinicService from "../clinic/clinic.service";
import medicationService from "../medication/medication.service";

export class RequestService {
  async create(data: RequestCreationAttributes): Promise<RequestModel> {
    if (!data.quantity || data.quantity <= 0)
      throw new Error("Invalid quantity");
    if (!data.clinicId) throw new Error("clinicId is required");

    const clinic = await clinicService.findById(data.clinicId);
    if (!clinic) throw new Error("Clinic not found");

    if (!data.medicationId) throw new Error("medicationId is required");

    const med = await medicationService.findById(data.medicationId);
    if (!med) throw new Error("Medication not found");

    if (data.warehouseId) {
      const inv = await inventoryService.find(
        data.warehouseId,
        data.medicationId,
      );
      if (!inv || inv.quantity < data.quantity)
        throw new Error("Insufficient inventory");
    }

    return RequestModel.create(data);
  }

  async list(): Promise<RequestModel[]> {
    return RequestModel.findAll({ where: { deleted: false } });
  }

  async findById(id: string): Promise<RequestModel | null> {
    return RequestModel.findByPk(id);
  }

  async getByClinic(clinicId: string): Promise<RequestModel[]> {
    return RequestModel.findAll({
      where: { clinicId, deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  async updateStatus(id: string, status: RequestStatus): Promise<RequestModel> {
    return sequelize.transaction(async (t) => {
      const req = await RequestModel.findByPk(id, { transaction: t });
      if (!req) throw new Error("Not found");

      const valid: RequestStatus[] = [
        "PENDING",
        "ASSIGNED",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
      ];
      if (!valid.includes(status)) throw new Error("Invalid status");

      const previous = req.status;

      if (status === "APPROVED") {
        if (!req.warehouseId)
          throw new Error("Request has no warehouse assigned");
        const inv = await inventoryService.find(
          req.warehouseId,
          req.medicationId,
        );
        if (!inv || inv.quantity < req.quantity)
          throw new Error("Insufficient inventory");
        inv.quantity = inv.quantity - req.quantity;
        await inv.save({ transaction: t });
      }

      if (previous === "APPROVED" && status !== "APPROVED") {
        if (req.warehouseId) {
          const inv = await inventoryService.find(
            req.warehouseId,
            req.medicationId,
          );
          if (inv) {
            inv.quantity = inv.quantity + req.quantity;
            await inv.save({ transaction: t });
          }
        }
      }

      req.status = status;
      await req.save({ transaction: t });
      return req;
    });
  }

  async assignToWarehouse(
    id: string,
    warehouseId: string,
  ): Promise<RequestModel> {
    return sequelize.transaction(async (t) => {
      const req = await RequestModel.findByPk(id, { transaction: t });
      if (!req) throw new Error("Not found");

      const inv = await inventoryService.find(warehouseId, req.medicationId);
      if (!inv || inv.quantity < req.quantity)
        throw new Error("Insufficient inventory to assign");

      req.warehouseId = warehouseId;
      req.status = "ASSIGNED";
      await req.save({ transaction: t });
      return req;
    });
  }
}

export default new RequestService();
