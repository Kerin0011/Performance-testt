import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config({ quiet: true });


export const db = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("PostgreSQL conectado");
  } catch (error) {
    console.error("Error conectando a PostgreSQL:", error);
    process.exit(1);
  }
};