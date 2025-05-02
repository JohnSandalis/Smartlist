import { Request, Response } from "express";
import { fetchSubcategories } from "../services/subcategory.service";
import { ApiError } from "../utils/ApiError";

// @desc  Get all subcategories
// @route GET /api/subcategories
export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const uuid = parseInt(req.params.uuid);
    const data = await fetchSubcategories();
    if (!data) {
      throw new ApiError(404, `Subcategories not found in the database`);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
