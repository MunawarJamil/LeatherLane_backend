// src/repositories/admin.repository.js
import pool from '../config/pool.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

/**
 * Create a new admin in DB
 * @param {Object} param0
 * @returns {Promise<Object>}
 */
export const createAdmin = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const id = uuidv4();

  const query = `
    INSERT INTO admins (id, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;

  const values = [id, name, email, hashedPassword];
  const result = await pool.query(query, values);

  return result.rows[0];
};

/**
 * Find admin by email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
export const findAdminByEmail = async (email) => {
  const query = `
    SELECT id, name, email, password, role, is_active
    FROM admins
    WHERE email = $1
  `;

  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
};

/**
 * Find admin by ID (safe for returning to client)
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const findAdminById = async (id) => {
  const query = `
    SELECT id, name, email, role, is_active
    FROM admins
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

/**
 * Verify hashed password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
