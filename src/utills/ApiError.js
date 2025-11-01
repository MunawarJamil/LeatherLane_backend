// src/core/ApiError.js
export default class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP status code
   * @param {string} message human-readable message
   * @param {object} [meta] optional metadata (validation errors etc.)
   */
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    meta = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes expected errors vs programmer errors
    this.meta = meta;
    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(message = "Bad Request", meta = null) {
    return new ApiError(400, message, meta);
  }

  static Unauthorized(message = "Unauthorized", meta = null) {
    return new ApiError(401, message, meta);
  }

  static Forbidden(message = "Forbidden", meta = null) {
    return new ApiError(403, message, meta);
  }

  static NotFound(message = "Not Found", meta = null) {
    return new ApiError(404, message, meta);
  }

  static Conflict(message = "Conflict", meta = null) {
    return new ApiError(409, message, meta);
  }

  static Internal(message = "Internal Server Error", meta = null) {
    return new ApiError(500, message, meta);
  }
}

// isOperational flag: allows the global error handler to decide whether to reveal info or treat as programmer crash.

// meta can carry Zod validation errors or other structured details.

// Static constructors (BadRequest, Unauthorized, etc.) make code readable: throw ApiError.BadRequest('email required').
