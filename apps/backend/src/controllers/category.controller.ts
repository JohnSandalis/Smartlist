import { Request, Response, NextFunction } from "express";
import { fetchCategories, fetchCategory } from "../services/category.service";
import { ApiError } from "../utils/ApiError";
import { Category } from "@smartlist/types";

interface ErrorResponse {
  status: number;
  message: string;
}

// @desc  Get all categories
// @route GET /categories
// @access Public
export const getCategories = async (
  req: Request,
  res: Response<Category[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const categories = await fetchCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(
      new ApiError(
        500,
        error instanceof Error ? error.message : "Failed to fetch categories"
      )
    );
  }
};

// @desc  Get a category's name and image url based on uuid
// @route GET /categories/:uuid
// @access Public
export const getCategory = async (
  req: Request,
  res: Response<Category | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const category = await fetchCategory(Number(req.params.uuid));
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error cases
      if (error.message.includes("not found")) {
        next(
          new ApiError(404, `Category with id ${req.params.uuid} not found`)
        );
        return;
      }
    }
    next(
      new ApiError(
        500,
        error instanceof Error ? error.message : "Failed to fetch category"
      )
    );
  }
};
