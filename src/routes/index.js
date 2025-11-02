import { Router } from "express";
import debugRoutes from "./debugRoutes.js";
const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Dockorized LeatherLane Backend API is Running..",
  });
});

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    name: process.env.APP_NAME,
  });
});

router.use("/debug", debugRoutes);

export default router;
