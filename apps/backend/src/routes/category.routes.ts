import { Router } from "express";
import { getCategories, getCategory } from "../controllers/category.controller";
import { getCategorySchema } from "../schemas/category.schema";
import { validate } from "../middleware/validate.middleware";

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Returns a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   image_url:
 *                     type: string
 *       404:
 *         description: Categories not found in database
 *       500:
 *         description: Internal server error
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/categories/{uuid}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get a category by UUID
 *     description: Returns a category's name and image URL by its UUID.
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: integer
 *         description: UUID of the category
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 image_url:
 *                   type: string
 *       400:
 *         description: Invalid UUID parameter
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/:uuid", validate(getCategorySchema), getCategory);

export default router;
