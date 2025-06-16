import { Request, Response, NextFunction } from "express";
import { Supermarket } from "@smartlist/types";
import { fetchSupermarkets } from "../services/supermarket.service";
import { ApiError } from "../utils/ApiError";

interface ErrorResponse {
  status: number;
  message: string;
}

// @desc Get all supermarkets
// @route GET /supermarkets
// @access Public
export const getSupermarkets = async (
  req: Request,
  res: Response<Supermarket[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const data = await fetchSupermarkets();
    if (!data) {
      throw new ApiError(404, "Supermarkets not found in the database");
    }
    res.status(200).json(data.supermarkets);
  } catch (error) {
    next(
      new ApiError(
        500,
        error instanceof Error ? error.message : "Failed to fetch supermarkets"
      )
    );
  }
};
