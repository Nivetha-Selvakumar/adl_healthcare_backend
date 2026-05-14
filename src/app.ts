import express from "express";
import cors from "cors";
import sequelize from "./config/database";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "ADL Healthcare Backend is Running!" });
});

app.get("/api/db-check", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: "success", message: "Successfully connected to MySQL Database!" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to connect to the database", error });
    }
});

export default app;