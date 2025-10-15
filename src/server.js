
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "./config/db.js"; // Ensure DB connects on server start
dotenv.config(); // Load env variables

const app = express();

// ✅ Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: "*" })); // Allow all origins for now (later we restrict)
app.use(helmet()); // Security headers
app.use(morgan("dev")); // HTTP logging

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "LeatherLane Backend API is Running 🚀" });
});

// ✅ Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
