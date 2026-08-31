import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export interface WarehouseAttributes {
  id: string;
  name: string;
  location?: string;
  deleted: boolean;
}

export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'id' | 'location' | 'deleted'> {}

export class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  public id!: string;
  public name!: string;
  public location?: string;
  public deleted!: boolean;
}

Warehouse.init(
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
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'warehouses',
    timestamps: true,
  }
);

export default Warehouse;