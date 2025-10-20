// middlewares/rateLimitLogin.js
import redisClient from "../config/redis.js";
import ApiError from "../utils/ApiError.js";
 
const MAX_ATTEMPTS = 5;
const WINDOW_IN_SECONDS = 60;
const BLOCK_TIME = 600; // 10 minutes

export const rateLimitLogin = async (req, res, next) => {
  try {
    const identifier = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const key = `login_attempts:${identifier}`;

    const attempts = await redisClient.get(key);

    // If blocked
    if (attempts && attempts === "BLOCKED") {
      return next(new ApiError(429, "Too many login attempts. Try again after 10 minutes."));
    }

    if (attempts && parseInt(attempts) >= MAX_ATTEMPTS) {
      await redisClient.set(key, "BLOCKED", { EX: BLOCK_TIME });
      return next(new ApiError(429, "Too many login attempts. You are temporarily blocked."));
    }

    // Increment attempts
    if (!attempts) {
      await redisClient.set(key, 1, { EX: WINDOW_IN_SECONDS });
    } else {
      await redisClient.incr(key);
    }

    next();
  } catch (error) {
    next(new ApiError(500, "Rate limit middleware failed"));
  }
};
