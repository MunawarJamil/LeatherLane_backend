import { pool } from "../../config/db.js"; // Assuming you export pg pool from db config
import { ApiError } from "../../utils/ApiError.js";
import pino from "../../utils/logger.js"; // We'll use this after we create logger.js

export class BaseRepository {
  constructor(tableName) {
    if (!tableName) {
      throw new ApiError(500, "Table name is required for repository");
    }
    this.table = tableName;
  }

  async findOne(whereClause, values = []) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE ${whereClause} LIMIT 1`;
      pino.info(`Executing Query: ${query}`);
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (err) {
      pino.error(`DB Error in findOne: ${err.message}`);
      throw new ApiError(500, "Database query failed");
    }
  }

  async create(columns, values, returning = "*") {
    try {
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
      const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING ${returning}`;
      pino.info(`Executing Query: ${query}`);
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      pino.error(`DB Error in create: ${err.message}`);
      throw new ApiError(500, "Database insert failed");
    }
  }

  async update(whereClause, values, updateClause, returning = "*") {
    try {
      const query = `UPDATE ${this.table} SET ${updateClause} WHERE ${whereClause} RETURNING ${returning}`;
      pino.info(`Executing Query: ${query}`);
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      pino.error(`DB Error in update: ${err.message}`);
      throw new ApiError(500, "Database update failed");
    }
  }

  async delete(whereClause, values = []) {
    try {
      const query = `DELETE FROM ${this.table} WHERE ${whereClause}`;
      pino.info(`Executing Query: ${query}`);
      await pool.query(query, values);
      return true;
    } catch (err) {
      pino.error(`DB Error in delete: ${err.message}`);
      throw new ApiError(500, "Database delete failed");
    }
  }
}
