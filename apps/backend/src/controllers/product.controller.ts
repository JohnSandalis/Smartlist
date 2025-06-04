import { Request, Response, NextFunction } from "express";
import {
  fetchProducts,
  fetchProductsByBarcodes,
  searchProductsService,
} from "../services/product.service";
import { ApiError } from "../utils/ApiError";
import { Product } from "@smartlist/types";
import {
  fetchSubSubCategoryUuids,
  fetchSubSubCategoryUuidsBySubCategories,
} from "../services/subsubcategory.service";
import { fetchSubCategoryUuidsByCategory } from "../services/subcategory.service";

// @desc  Get all products of specific category and specific range
// @route GET /api/products?categoryId=2&start=0&end=9
export const getProductsByCategory = async (
  req: Request,
  res: Response<Product[]>,
  next: NextFunction
) => {
  const { categoryId, start, end } = req.query;

  if (!categoryId) {
    return next(new ApiError(400, "Category ID is required"));
  }

  const parsedStart = parseInt(start as string, 10);
  const parsedEnd = parseInt(end as string, 10);

  if (isNaN(parsedStart) || isNaN(parsedEnd)) {
    return next(new ApiError(400, "Start and end must be valid integers"));
  }

  const subCategoryUuids = await fetchSubCategoryUuidsByCategory(
    categoryId as string
  );

  if (!subCategoryUuids || !Array.isArray(subCategoryUuids)) {
    return next(new ApiError(400, "Invalid sub-category UUIDs"));
  }

  const subSubCategoryUuids = await fetchSubSubCategoryUuidsBySubCategories(
    subCategoryUuids
  );

  if (!subSubCategoryUuids || !Array.isArray(subSubCategoryUuids)) {
    return next(new ApiError(400, "Invalid sub-sub-category UUIDs"));
  }

  try {
    const data = await fetchProducts(
      subSubCategoryUuids,
      Number(parsedStart),
      Number(parsedEnd)
    );

    if (!data) {
      throw new ApiError(404, `Products not found in the database`);
    }

    res.json(data.products);
  } catch (err) {
    next(err);
  }
};

// @desc  Get all products of specific sub-sub-categories and specific range
// @route GET /api/products?subCategoryId=2&start=0&end=9
export const getProducts = async (
  req: Request,
  res: Response<Product[]>,
  next: NextFunction
) => {
  const { subCategoryId, start, end } = req.query;

  if (!subCategoryId) {
    return next(new ApiError(400, "Sub-category ID is required"));
  }

  const parsedStart = parseInt(start as string, 10);
  const parsedEnd = parseInt(end as string, 10);

  if (isNaN(parsedStart) || isNaN(parsedEnd)) {
    return next(new ApiError(400, "Start and end must be valid integers"));
  }

  const subSubCategoryUuids = await fetchSubSubCategoryUuids(
    subCategoryId as string
  );

  if (!subSubCategoryUuids || !Array.isArray(subSubCategoryUuids)) {
    return next(new ApiError(400, "Invalid sub-sub-category UUIDs"));
  }

  try {
    const data = await fetchProducts(
      subSubCategoryUuids,
      Number(parsedStart),
      Number(parsedEnd)
    );
    if (!data) {
      throw new ApiError(404, `Products not found in the database`);
    }
    res.json(data.products);
  } catch (err) {
    next(err);
  }
};

// @desc  Get products by a list of barcodes
// @route POST /api/products/by-barcodes
export const getProductsByBarcodes = async (
  req: Request,
  res: Response<Product[]>,
  next: NextFunction
) => {
  const { barcodes } = req.body;

  if (!Array.isArray(barcodes) || barcodes.length === 0) {
    return next(new ApiError(400, "Barcodes must be a non-empty array"));
  }

  try {
    const data = await fetchProductsByBarcodes(barcodes);
    if (!data) {
      throw new ApiError(404, "No products found for the given barcodes");
    }
    res.json(data.products);
  } catch (err) {
    next(err);
  }
};

// @desc  Search products by name
// @route GET /api/products/search?query=milk
export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }
  try {
    const data = await searchProductsService(query);
    res.json(data || []);
  } catch (err) {
    next(new ApiError(500, "Internal server error"));
  }
};
