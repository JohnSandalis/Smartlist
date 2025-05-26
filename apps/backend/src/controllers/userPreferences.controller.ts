import { Request, Response } from "express";
import {
  getUserPreferences,
  upsertUserPreferences,
} from "../services/userPreferences.service";

export const fetchUserPreferences = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { data, error } = await getUserPreferences(userId);
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ selected_supermarkets: data?.selected_supermarkets ?? [] });
};

export const saveUserPreferences = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { selected_supermarkets } = req.body;
  const { error } = await upsertUserPreferences(userId, selected_supermarkets);
  if (error) return res.status(400).json({ error: error.message });
  return res.sendStatus(200);
};
