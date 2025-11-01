import bcrypt from "bcrypt";
import pool from "../../../../config/db.js";
import ApiError from "../../../../utills/ApiError.js";
import logger from "../../../../utills/logger.js";

export const registerAdmin = async (data) => {
  const { name, email, password } = data;

  // 1. Check if admin exists
  const checkQuery = "SELECT id FROM admins WHERE email = $1 LIMIT 1";
  const existing = await pool.query(checkQuery, [email]);

  if (existing.rowCount > 0) {
    throw new ApiError(409, "Admin with this email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert admin into DB
  const insertQuery = `
    INSERT INTO admins (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;
  const { rows } = await pool.query(insertQuery, [name, email, hashedPassword]);

  if (rows.length === 0) {
    throw new ApiError(500, "Failed to register admin");
  }

  logger.info(`Admin added to DB - ${email}`);

  return rows[0];
};
