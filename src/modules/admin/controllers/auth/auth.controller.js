import { registerAdmin } from "../../services/authService/auth.service.js";
import { ApiResponse } from "../../../../utills/ApiResponse.js"; 
import logger from "../../../../utills/logger.js";
import { asyncHandler } from "../../../../middlewares/asyncHandler.js";

 

export const registerAdminHandler = asyncHandler(async (req, res) => {
  const admin = await registerAdmin(req.body);
  
  logger.info(`New admin registered: ${admin.email}`);
  
  return res
    .status(201)
    .json(ApiResponse.success("Admin registered successfully", admin));
});