import { Router } from "express";

const router = Router();

router.get("/db", async (req, res) => {
  try {
    const db = req.app.locals.db;
    await db.query("SELECT 1");
    return res.json({ status: "ok", message: "PostgreSQL is connected" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "DB connection failed", error: error.message });
  }
});

router.get("/redis", async (req, res) => {
  try {
    const redis = req.app.locals.redis;
    const pong = await redis.ping();
    return res.json({ status: "ok", message: "Redis is connected", response: pong });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Redis connection failed", error: error.message });
  }
});

export default router;
