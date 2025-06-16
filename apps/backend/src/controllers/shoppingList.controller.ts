import { Request, Response, NextFunction } from "express";
import {
  fetchLatestShoppingList,
  updateShoppingList,
  createShoppingList,
} from "../services/shoppingList.service";
import { ApiError } from "../utils/ApiError";
import { ShoppingListItem } from "../schemas/shoppingList.schema";

interface ErrorResponse {
  status: number;
  message: string;
}

interface SuccessResponse {
  id?: string;
  message?: string;
}

// @desc Fetch latest shopping list
// @route GET /shopping-lists/latest
// @access Private
export const getLatestShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { data, error } = await fetchLatestShoppingList(userId);

    if (error) {
      throw new ApiError(400, error.message);
    }

    if (!data) {
      throw new ApiError(404, "No shopping list found");
    }

    res.status(200).json(data);
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, "Failed to fetch shopping list")
    );
  }
};

// @desc Save shopping list
// @route POST /shopping-lists
// @access Private
export const saveShoppingList = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { items, listId } = req.body as {
      items: ShoppingListItem[];
      listId?: string;
    };

    if (listId) {
      const { error } = await updateShoppingList(listId, items);
      if (error) {
        throw new ApiError(400, error.message);
      }
      res.status(200).json({ message: "Shopping list updated successfully" });
    } else {
      const { data, error } = await createShoppingList(userId, items);
      if (error) {
        throw new ApiError(400, error.message);
      }
      if (!data?.id) {
        throw new ApiError(500, "Failed to create shopping list");
      }
      res.status(201).json({ id: data.id });
    }
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, "Failed to save shopping list")
    );
  }
};
