import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Order Management System API" });
});

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ success: true, result: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
