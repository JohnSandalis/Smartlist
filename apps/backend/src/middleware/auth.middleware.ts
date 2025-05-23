import { Request, Response, NextFunction } from "express";
import supabase from "../utils/supabase";

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies?.["sb-access-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Validate JWT with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Attach user info to request
  (req as any).user = data.user;
  next();
}
