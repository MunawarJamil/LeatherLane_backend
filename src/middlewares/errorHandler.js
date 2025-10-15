export const notFound = (req, res) =>
  res.status(404).json({ error: "Not Found" });
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = { error: err.message || "Server Error" };
  if (process.env.NODE_ENV !== "production") payload.stack = err.stack;
  res.status(status).json(payload);
};
