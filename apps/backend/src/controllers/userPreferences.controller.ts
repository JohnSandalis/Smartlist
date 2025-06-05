import { NextFunction, Request, Response } from "express";
import {
  getUserPreferences,
  upsertUserPreferences,
} from "../services/userPreferences.service";
import { ApiError } from "../utils/ApiError";

interface ErrorResponse {
  status: number;
  message: string;
}

export const fetchUserPreferences = async (
  req: Request,
  res: Response<{ selected_supermarkets: number[] } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const data = await getUserPreferences(userId);
    res.status(200).json({
      selected_supermarkets: data?.selected_supermarkets ?? [],
    });
  } catch (error) {
    next(
      new ApiError(
        500,
        error instanceof Error
          ? error.message
          : "Failed to fetch user preferences"
      )
    );
  }
};

export const saveUserPreferences = async (
  req: Request,
  res: Response<{ message: string } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { selected_supermarkets } = req.body;
    await upsertUserPreferences(userId, selected_supermarkets);
    res.status(200).json({ message: "User preferences saved" });
  } catch (error) {
    next(
      new ApiError(
        500,
        error instanceof Error
          ? error.message
          : "Failed to save user preferences"
      )
    );
  }
};
