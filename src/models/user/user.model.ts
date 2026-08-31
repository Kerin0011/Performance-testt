import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MANAGER';
  deleted: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'deleted'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'ADMIN' | 'MANAGER';
  public deleted!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'MANAGER'),
      allowNull: false,
      defaultValue: 'MANAGER',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;