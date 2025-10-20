import { registerAdmin } from "../services/admin.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js"; 
import { errorHandler } from "../../../middlewares/errorHandler.js";
 
export const registerAdminHandler = errorHandler(async (req, res) => {
  const admin = await registerAdmin(req.body);

  return res
    .status(201)
    .json(ApiResponse.success("Admin registered successfully", admin));
});
