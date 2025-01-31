import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (error.status === 401 && error.message === "Unauthorized") {
    return res.status(401).json({
      message: "Requires authentication",
    });
  }

  if (
    error.status === 401 &&
    (error.message === "Permission denied" || error.message === "Invalid token")
  ) {
    return res.status(403).json({
      message: error.message,
    });
  }

  // Default error response
  return res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
};

export default errorHandler;