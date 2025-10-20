import bcrypt from "bcrypt";
import { pool } from "../../../config/db.js";
import { ApiError } from "../../../utils/ApiError.js";
import pino from "../../../utils/logger.js";

export const registerAdmin = async (data) => {
  const { name, email, password } = data;

  //   1. Check if admin exists
  const checkQuery = "SELECT id FROM admins WHERE email = $1 LIMIT 1";
  const existing = await pool.query(checkQuery, [email]);

  if (existing.rows.length > 0) {
    throw new ApiError(409, "Admin with this email already exists");
  }

  //   2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   3. Insert into DB
  const insertQuery = `
    INSERT INTO admins (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
  `;
  const result = await pool.query(insertQuery, [name, email, hashedPassword]);

  pino.info(`Admin registered - Email: ${email}`);

  return result.rows[0];
};
