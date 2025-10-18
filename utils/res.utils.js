const handleErrors = (error) => {
  let errRes = {
    status: 500, // Default to internal server error
    message: "An unexpected error occurred.",
  };

  if (error) {
    errRes.status = error.status;
    errRes.message = error.message;

    // MongoDB Duplicate Key Errors
    if (error.code === 11000) {
      errRes.status = 400;
      // Check if duplicate key is email
      if (error.keyPattern && error.keyPattern.email) {
        errRes.message = "Email already exists. Please use a different email.";
      } else {
        errRes.message = "Duplicate field value entered";
      }
    }

    // Mongoose Validation Errors (e.g., missing required fields)
    if (error.name === "ValidationError") {
      errRes.status = 400;
      errRes.message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", "); // Collect all validation messages
    }
  }

  return errRes;
};

export const handleFailedRes = (res, error) => {
  const errorResponse = handleErrors(error);
  res.status(errorResponse.status || 500).json({
    success: false,
    message: errorResponse.message || "Internal Server Error",
  });
};

export const handleSuccessRes = (res, status, message, data = {}) => {
  res.status(status).json({ success: true, message, data: { ...data } });
};
