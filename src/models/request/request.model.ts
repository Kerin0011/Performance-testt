import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export type RequestStatus = 'PENDING' | 'ASSIGNED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface RequestAttributes {
  id: string;
  clinicId: string;
  medicationId: string;
  quantity: number;
  warehouseId?: string;
  status: RequestStatus;
  deleted: boolean;
}

export interface RequestCreationAttributes extends Optional<RequestAttributes, 'id' | 'warehouseId' | 'status' | 'deleted'> {}

export class RequestModel extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
  public id!: string;
  public clinicId!: string;
  public medicationId!: string;
  public quantity!: number;
  public warehouseId?: string;
  public status!: RequestStatus;
  public deleted!: boolean;
}

RequestModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clinicId: {
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
    },
    warehouseId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'APPROVED', 'REJECTED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'requests',
    timestamps: true,
  }
);

export default RequestModel;