// config/db.js
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  max: process.env.PG_MAX_CLIENTS ? parseInt(process.env.PG_MAX_CLIENTS) : 10,
});

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL Connection Error:", err.message);
    // process.exit(1); // Exit if DB connection fails
  }
})();

export default pool;
