import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database";
import { syncModels } from './models/index';
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import routes from "./routes/index";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ mensaje: "API Running" });
});

const PORT = process.env.PORT || 3000;

export default app;

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(async () => {
        await syncModels();
        app.listen(PORT, () => {
            console.log(`Server Running in http://localhost:${PORT}`);
        });
    });
}
