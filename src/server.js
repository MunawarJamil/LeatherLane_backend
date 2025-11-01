import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/db.js";
import redisClient, { connectRedis } from "./config/redis.js";

dotenv.config();

// Start Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // ✅ Test PostgreSQL connection
    await pool.query("SELECT 1");
    console.log(" PostgreSQL Connected Successfully");

    // ✅ Connect Redis only once
    await connectRedis();

    // ✅ Attach global references (optional)
    app.locals.db = pool;
    app.locals.redis = redisClient;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

start();
