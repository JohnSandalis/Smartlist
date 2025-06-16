import { Router } from "express";
import {
  fetchUserPreferences,
  saveUserPreferences,
} from "../controllers/userPreferences.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
/**
 * @openapi
 * /user-preferences:
 *   get:
 *     tags:
 *       - User Preferences
 *     summary: Get user preferences
 *     description: Returns the user's preferences including selected supermarkets.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 selected_supermarkets:
 *                   type: array
 *                   items:
 *                     type: number
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateJWT, fetchUserPreferences);

/**
 * @openapi
 * /user-preferences:
 *   put:
 *     tags:
 *       - User Preferences
 *     summary: Save user preferences
 *     description: Updates the user's preferences including selected supermarkets.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selected_supermarkets:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: User preferences updated
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.put("/", authenticateJWT, saveUserPreferences);

export default router;
