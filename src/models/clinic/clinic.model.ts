import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export interface ClinicAttributes {
  id: string;
  name: string;
  nit: string;
  contact: string;
  deleted: boolean;
}

export interface ClinicCreationAttributes extends Optional<ClinicAttributes, 'id' | 'deleted'> {}

export class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
  public id!: string;
  public name!: string;
  public nit!: string;
  public contact!: string;
  public deleted!: boolean;
}

Clinic.init(
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
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'clinics',
    timestamps: true,
  }
);

export default Clinic;