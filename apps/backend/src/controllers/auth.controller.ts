import { Request, Response } from "express";
import { signInWithEmail, signUpWithEmail } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await signInWithEmail(email, password);

  if (error) return res.status(401).json({ error: error.message });

  res.cookie("sb-access-token", data.session?.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
  });

  return res.json({ user: data.user });
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await signUpWithEmail(email, password);

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ user: data.user });
};

export const getMe = async (req: Request, res: Response) => {
  return res.json({ user: (req as any).user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("sb-access-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.sendStatus(200);
};
