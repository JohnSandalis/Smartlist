import { Router } from "express";
import { login, signup, getMe, logout } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, signupSchema } from "@smartlist/schemas";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signupSchema), signup);
router.get("/me", authenticateJWT, getMe);
router.post("/logout", authenticateJWT, logout);

export default router;
