import { Router } from "express";
import { getProducts } from "../controllers/product.controller";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
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
 *                   prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date
 *                         unit:
 *                           type: string
 *                         price:
 *                           type: number
 *                         merchant_uuid:
 *                           type: integer
 *                         price_normalized:
 *                           type: number
 *       400:
 *         description: Bad request
 *       404:
 *         description: Products not found in database
 *       500:
 *         description: Internal server error
 */
router.get("/", getProducts);

export default router;
