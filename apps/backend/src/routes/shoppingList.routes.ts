import { Router } from "express";
import {
  getLatestShoppingList,
  saveShoppingList,
} from "../controllers/shoppingList.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getLatestShoppingList);
router.post("/", authenticateJWT, saveShoppingList);

export default router;
