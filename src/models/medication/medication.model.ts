import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export interface MedicationAttributes {
  id: string;
  name: string;
  code: string;
  deleted: boolean;
}

export interface MedicationCreationAttributes extends Optional<MedicationAttributes, 'id' | 'deleted'> {}

export class Medication extends Model<MedicationAttributes, MedicationCreationAttributes> implements MedicationAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public deleted!: boolean;
}

Medication.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'medications',
    timestamps: true,
  }
);

export default Medication;