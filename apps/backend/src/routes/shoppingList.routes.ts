import { Router } from "express";
import {
  getLatestShoppingList,
  saveShoppingList,
} from "../controllers/shoppingList.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { saveShoppingListSchema } from "../schemas/shoppingList.schema";

const router = Router();

/**
 * @openapi
 * /shopping-list/latest:
 *   get:
 *     tags:
 *       - Shopping List
 *     summary: Get user's latest shopping list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest shopping list
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No shopping list found
 *       500:
 *         description: Internal server error
 */
router.get("/latest", authenticateJWT, getLatestShoppingList);

/**
 * @openapi
 * /shopping-list:
 *   post:
 *     tags:
 *       - Shopping List
 *     summary: Create or update a shopping list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               listId:
 *                 type: string
 *                 format: uuid
 *                 description: UUID of the list to update (optional)
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - barcode
 *                     - quantity
 *                   properties:
 *                     barcode:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *     responses:
 *       200:
 *         description: Shopping list updated successfully
 *       201:
 *         description: Shopping list created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authenticateJWT,
  validate(saveShoppingListSchema),
  saveShoppingList
);

export default router;
