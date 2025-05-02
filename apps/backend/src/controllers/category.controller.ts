import { Request, Response, NextFunction } from "express";
import { fetchCategories, fetchCategory } from "../services/category.service";
import { ApiError } from "../utils/ApiError";

// @desc  Get all categories
// @route GET /api/categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const uuid = parseInt(req.params.uuid);
    const data = await fetchCategories();
    if (!data) {
      throw new ApiError(404, `Categories not found in the database`);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc  Get a category's name and image url based on uuid
// @route GET /api/categories/:uuid
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = parseInt(req.params.uuid);
    if (isNaN(uuid) || uuid <= 0) {
      throw new ApiError(400, "Invalid UUID parameter");
    }

    const data = await fetchCategory(uuid);
    if (!data) {
      throw new ApiError(404, `No category with id ${uuid} found`);
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};
