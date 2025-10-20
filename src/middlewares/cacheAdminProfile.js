// middlewares/cacheAdminProfile.js
import redisClient from "../config/redisClient.js";

export const cacheAdminProfile = async (req, res, next) => {
  try {
    const adminId = req.user?.id;
    if (!adminId) return next();

    const cacheKey = `admin_profile:${adminId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json({
        success: true,
        message: "Fetched from cache",
        data: JSON.parse(cachedData)
      });
    }

    // Attach key for controller to set cache
    req.cacheKey = cacheKey;
    next();
  } catch (error) {
    next(); // Fail silently, let request continue
  }
};
