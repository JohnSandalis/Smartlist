import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
}
