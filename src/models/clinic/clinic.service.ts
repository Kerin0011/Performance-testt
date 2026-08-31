import Clinic, { ClinicCreationAttributes } from "./clinic.model";

export class ClinicService {
  async create(data: ClinicCreationAttributes): Promise<Clinic> {
    return Clinic.create(data);
  }

  async list(): Promise<Clinic[]> {
    return Clinic.findAll({ where: { deleted: false } });
  }

  async findById(id: string): Promise<Clinic | null> {
    return Clinic.findByPk(id);
  }

  async findByNit(nit: string): Promise<Clinic | null> {
    return Clinic.findOne({ where: { nit, deleted: false } });
  }

  async update(
    id: string,
    data: Partial<Omit<ClinicCreationAttributes, "id">>,
  ): Promise<Clinic | null> {
    const c = await Clinic.findByPk(id);
    if (!c) return null;
    await c.update(data);
    return c;
  }

  async softDelete(id: string): Promise<Clinic | null> {
    const c = await Clinic.findByPk(id);
    if (!c) return null;
    c.deleted = true;
    await c.save();
    return c;
  }
}

export default new ClinicService();
