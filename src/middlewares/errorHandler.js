import logger from "../utills/logger.js";


export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = { error: err.message || "Server Error" };
  if (process.env.NODE_ENV !== "production") payload.stack = err.stack;
  res.status(status).json(payload);
};



export const notFound = (req, res) => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;

  // Log it clearly
  logger.warn(message);

  return res.status(404).json({
    success: false,
    error: "Not Found",
    path: req.originalUrl,
    method: req.method,
  });
};