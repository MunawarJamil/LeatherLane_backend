import fs from 'fs';
import path from 'path';
import pool from './db.js';
const __dirname = path.resolve();
const sqlPath = path.join(__dirname, 'src/config/init.sql');

const runMigrations = async () => {
  try {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log("init.sql verified successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed", error);
    process.exit(1);
  }
};

runMigrations();
