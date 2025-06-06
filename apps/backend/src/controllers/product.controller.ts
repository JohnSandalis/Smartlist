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

interface ErrorResponse {
  status: number;
  message: string;
}

// @desc  Get all products of specific category and specific range
// @route GET /products?categoryId=2&start=0&end=9
// @access Public
export const getProductsByCategory = async (
  req: Request,
  res: Response<Product[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { categoryId, start, end } = req.query;
    const subCategoryUuids = await fetchSubCategoryUuidsByCategory(
      categoryId as string
    );

    if (!subCategoryUuids || !Array.isArray(subCategoryUuids)) {
      throw new ApiError(404, "No sub-categories found");
    }

    const subSubCategoryUuids = await fetchSubSubCategoryUuidsBySubCategories(
      subCategoryUuids
    );

    if (!subSubCategoryUuids || !Array.isArray(subSubCategoryUuids)) {
      throw new ApiError(404, "No sub-sub-categories found");
    }

    const products = await fetchProducts(
      subSubCategoryUuids,
      Number(start),
      Number(end)
    );

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      const status = error instanceof ApiError ? error.status : 500;
      next(new ApiError(status, error.message));
    } else {
      next(new ApiError(500, "An unexpected error occurred"));
    }
  }
};

// @desc  Get all products of specific sub-sub-categories and specific range
// @route GET /products?subCategoryId=2&start=0&end=9
// @access Public
export const getProducts = async (
  req: Request,
  res: Response<Product[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { subCategoryId, start, end } = req.query;
    const subSubCategoryUuids = await fetchSubSubCategoryUuids(
      subCategoryId as string
    );

    if (!subSubCategoryUuids || !Array.isArray(subSubCategoryUuids)) {
      throw new ApiError(404, "No sub-sub-categories found");
    }

    const products = await fetchProducts(
      subSubCategoryUuids,
      Number(start),
      Number(end)
    );

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      const status = error instanceof ApiError ? error.status : 500;
      next(new ApiError(status, error.message));
    } else {
      next(new ApiError(500, "An unexpected error occurred"));
    }
  }
};

// @desc  Get products by a list of barcodes
// @route POST /products/by-barcodes
// @access Public
export const getProductsByBarcodes = async (
  req: Request,
  res: Response<Product[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { barcodes } = req.body;
    const products = await fetchProductsByBarcodes(barcodes);
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      const status = error instanceof ApiError ? error.status : 500;
      next(new ApiError(status, error.message));
    } else {
      next(new ApiError(500, "An unexpected error occurred"));
    }
  }
};

// @desc  Search products by name
// @route GET /products/search?query=milk
// @access Public
export const searchProducts = async (
  req: Request,
  res: Response<Product[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const query = req.query.query as string;
    const products = await searchProductsService(query);
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      const status = error instanceof ApiError ? error.status : 500;
      next(new ApiError(status, error.message));
    } else {
      next(new ApiError(500, "An unexpected error occurred"));
    }
  }
};
