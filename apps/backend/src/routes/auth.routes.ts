import { Router } from "express";
import { login, signup, getMe, logout } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", authenticateJWT, getMe);
router.post("/logout", logout);

export default router;
