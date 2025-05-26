import { Request, Response, NextFunction } from "express";
import { Supermarket } from "@smartlist/types";
import { fetchSupermarkets } from "../services/supermarket.service";
import { ApiError } from "../utils/ApiError";

// @desc  Get all supermarkets
// @route GET /api/supermarkets
// @access Public
export const getSupermarkets = async (
  req: Request,
  res: Response<Supermarket[]>,
  next: NextFunction
) => {
  try {
    const data = await fetchSupermarkets();
    if (!data) {
      throw new ApiError(404, "Supermarkets not found in the database");
    }
    res.json(data.supermarkets);
  } catch (err) {
    next(err);
  }
};
