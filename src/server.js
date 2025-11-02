import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/db.js";
import redisClient, { connectRedis } from "./config/redis.js";

dotenv.config();

// Start Server
const PORT = process.env.PORT || 7000;

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

    // app.listen(PORT, () => {
    //   console.log(`🚀 Server running on port ${PORT}`);
    // });
//new change to bind to all interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

start();
