import { Router } from "express";
import {
  fetchUserPreferences,
  saveUserPreferences,
} from "../controllers/userPreferences.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, fetchUserPreferences);
router.put("/", authenticateJWT, saveUserPreferences);

export default router;
