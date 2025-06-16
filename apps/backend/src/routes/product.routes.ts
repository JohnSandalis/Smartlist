import { Router } from "express";
import {
  getProductByBarcode,
  getProducts,
  getProductsByBarcodes,
  getProductsByCategory,
  searchProducts,
} from "../controllers/product.controller";
import { validate } from "../middleware/validate.middleware";
import {
  getProductsSchema,
  getProductsByBarcodesSchema,
  searchProductsSchema,
  getProductsByCategorySchema,
  getProductByBarcodeSchema,
} from "../schemas/product.schema";

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products of specific sub-category and specific range
 *     description: Returns a list of all products of specific sub-category and specific range.
 *     parameters:
 *       - in: query
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the sub-category
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: number
 *         description: Start index for pagination
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: number
 *         description: End index for pagination
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barcode:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   supplier:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         merchant_uuid:
 *                           type: integer
 *                         price:
 *                           type: number
 *                         price_normalized:
 *                           type: number
 *                         date:
 *                           type: string
 *                           format: date
 *                         unit:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Products not found in database
 *       500:
 *         description: Internal server error
 */
router.get("/", validate(getProductsSchema), getProducts);

/**
 * @openapi
 * /products/by-barcodes:
 *   post:
 *     tags:
 *       - Products
 *     summary: Get products by barcodes
 *     description: Returns a list of products matching the provided barcodes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcodes:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - barcodes
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barcode:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   supplier:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         merchant_uuid:
 *                           type: integer
 *                         price:
 *                           type: number
 *                         price_normalized:
 *                           type: number
 *                         date:
 *                           type: string
 *                           format: date
 *                         unit:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: No products found for the given barcodes
 *       500:
 *         description: Internal server error
 */
router.post(
  "/by-barcodes",
  validate(getProductsByBarcodesSchema),
  getProductsByBarcodes
);

/**
 * @openapi
 * /products/by-category:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products by category
 *     description: Returns a list of products matching the provided category.
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the category
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: number
 *         description: Start index for pagination
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: number
 *         description: End index for pagination
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barcode:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   supplier:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         merchant_uuid:
 *                           type: integer
 *                         price:
 *                           type: number
 *                         price_normalized:
 *                           type: number
 *                         date:
 *                           type: string
 *                           format: date
 *                         unit:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: No products found for the given barcodes
 *       500:
 *         description: Internal server error
 */
router.get(
  "/by-category",
  validate(getProductsByCategorySchema),
  getProductsByCategory
);

/**
 * @openapi
 * /products/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search products by name
 *     description: Returns a list of products matching the provided query.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barcode:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   supplier:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         merchant_uuid:
 *                           type: integer
 *                         price:
 *                           type: number
 *                         price_normalized:
 *                           type: number
 *                         date:
 *                           type: string
 *                           format: date
 *                         unit:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: No products found for the given query
 *       500:
 *         description: Internal server error
 */
router.get("/search", validate(searchProductsSchema), searchProducts);

/**
 * @openapi
 * /products/by-barcode:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by barcode
 *     description: Returns a product matching the provided barcode.
 *     parameters:
 *       - in: query
 *         name: barcode
 *         required: true
 *         schema:
 *           type: string
 *         description: Barcode of the product
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 barcode:
 *                   type: string
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 category:
 *                   type: array
 *                   items:
 *                     type: string
 *                 supplier:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       merchant_uuid:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       price_normalized:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date
 *                       unit:
 *                         type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: No product found for the given barcode
 *       500:
 *         description: Internal server error
 */
router.get(
  "/by-barcode",
  validate(getProductByBarcodeSchema),
  getProductByBarcode
);

export default router;
