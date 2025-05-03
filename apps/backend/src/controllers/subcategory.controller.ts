import { Request, Response, NextFunction } from "express";
import { fetchSubcategories } from "../services/subcategory.service";
import { ApiError } from "../utils/ApiError";
import { SubCategory } from "@smartlist/types";

// @desc  Get all subcategories
// @route GET /api/subcategories
export const getSubcategories = async (
  req: Request,
  res: Response<SubCategory[]>,
  next: NextFunction
) => {
  try {
    const data = await fetchSubcategories();
    if (!data) {
      throw new ApiError(404, `Subcategories not found in the database`);
    }
    res.json(data.subcategories);
  } catch (err) {
    next(err);
  }
};
