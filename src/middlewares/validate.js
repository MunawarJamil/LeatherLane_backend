import ApiError from "../utills/ApiError.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData; //  sanitized & validated data
      next();
    } catch (error) {
      const formattedErrors = error.errors?.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      throw new ApiError(400, "Validation Error", formattedErrors);
    }
  };
};

// usage example: router.post("/register", validate(adminRegisterSchema), AdminController.register);
