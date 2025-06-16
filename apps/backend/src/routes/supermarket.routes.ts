import { Router } from "express";
import { getSupermarkets } from "../controllers/supermarket.controller";

const router = Router();

/**
 * @openapi
 * /supermarkets:
 *   get:
 *     tags:
 *       - Supermarkets
 *     summary: Get all supermarkets
 *     description: Returns a list of all supermarkets.
 *     responses:
 *       200:
 *         description: A list of supermarkets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   merchant_uuid:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   display_name:
 *                     type: string
 *       404:
 *         description: Supermarkets not found in database
 *       500:
 *         description: Internal server error
 */
router.get("/", getSupermarkets);

export default router;
