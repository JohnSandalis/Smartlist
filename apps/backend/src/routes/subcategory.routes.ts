import { Router } from "express";
import { getSubcategories } from "../controllers/subcategory.controller";

const router = Router();

/**
 * @openapi
 * /api/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     description: Returns a list of all subcategories.
 *     responses:
 *       200:
 *         description: A list of subcategories
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
 *                   category_uuid:
 *                     type: integer
 *                     description: The UUID of the parent category this subcategory belongs to
 *       404:
 *         description: Subcategories not found in database
 *       500:
 *         description: Internal server error
 */
router.get("/", getSubcategories);

export default router;
