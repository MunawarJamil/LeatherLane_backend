import express from "express";
import { registerAdminHandler } from "../controllers/auth/auth.controller.js";
import { validateSchema } from "../../../middlewares/validate.js";
import { userRegisterSchema } from "../../../validators/user.schema.js";

const adminRouter = express.Router();

//  Admin Registration Route
adminRouter.post(
  "/register",
  validateSchema(userRegisterSchema),
  registerAdminHandler
);

//  Later you’ll add:
// router.post("/login", validateSchema(adminLoginSchema), loginAdminHandler);
// router.post("/logout", verifyToken, logoutAdminHandler);

export default adminRouter;
