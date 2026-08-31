import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export interface InventoryAttributes {
  id: string;
  warehouseId: string;
  medicationId: string;
  quantity: number;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id' | 'quantity'> {}

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: string;
  public warehouseId!: string;
  public medicationId!: string;
  public quantity!: number;
}

Inventory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    medicationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'inventories',
    timestamps: true,
  }
);

export default Inventory;