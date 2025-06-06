import { Request, Response, NextFunction } from "express";
import { fetchSubcategories } from "../services/subcategory.service";
import { ApiError } from "../utils/ApiError";
import { SubCategory } from "@smartlist/types";

interface ErrorResponse {
  status: number;
  message: string;
}

// @desc  Get all subcategories
// @route GET /subcategories
// @access Public
export const getSubcategories = async (
  req: Request,
  res: Response<SubCategory[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const data = await fetchSubcategories();
    if (!data) {
      throw new ApiError(404, `Subcategories not found in the database`);
    }
    res.status(200).json(data.subcategories);
  } catch (error) {
    next(
      new ApiError(
        500,
        error instanceof Error ? error.message : "Failed to fetch subcategories"
      )
    );
  }
};
