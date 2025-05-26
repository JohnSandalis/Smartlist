import { Request, Response } from "express";
import {
  fetchLatestShoppingList,
  updateShoppingList,
  createShoppingList,
} from "../services/shoppingList.service";

export const getLatestShoppingList = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { data, error } = await fetchLatestShoppingList(userId);
  if (error) return res.status(400).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "No shopping list found" });
  return res.json(data);
};

export const saveShoppingList = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { items, listId } = req.body;

  if (listId) {
    const { error } = await updateShoppingList(listId, items);
    if (error) return res.status(400).json({ error: error.message });
    return res.sendStatus(200);
  } else {
    const { data, error } = await createShoppingList(userId, items);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ id: data.id });
  }
};
