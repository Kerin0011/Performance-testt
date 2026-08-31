import Medication, { MedicationCreationAttributes } from "./medication.model";

export class MedicationService {
  async create(data: MedicationCreationAttributes): Promise<Medication> {
    return Medication.create(data);
  }

  async list(): Promise<Medication[]> {
    return Medication.findAll({ where: { deleted: false } });
  }

  async findById(id: string): Promise<Medication | null> {
    return Medication.findByPk(id);
  }

  async findByCode(code: string): Promise<Medication | null> {
    return Medication.findOne({ where: { code, deleted: false } });
  }

  async update(
    id: string,
    data: Partial<Omit<MedicationCreationAttributes, "id">>,
  ): Promise<Medication | null> {
    const m = await Medication.findByPk(id);
    if (!m) return null;
    await m.update(data);
    return m;
  }

  async softDelete(id: string): Promise<Medication | null> {
    const m = await Medication.findByPk(id);
    if (!m) return null;
    m.deleted = true;
    await m.save();
    return m;
  }
}

export default new MedicationService();
