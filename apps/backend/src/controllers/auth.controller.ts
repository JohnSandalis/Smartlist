import { NextFunction, Request, Response } from "express";
import { signInWithEmail, signUpWithEmail } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";

interface ErrorResponse {
  status: number;
  message: string;
}

export const login = async (
  req: Request,
  res: Response<{ user: any } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      throw new ApiError(401, error.message);
    }

    if (!data?.session?.access_token) {
      throw new ApiError(401, "Login failed - no access token received");
    }

    res.cookie("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    res.status(200).json({ user: data.user });
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(
        new ApiError(
          500,
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during login"
        )
      );
    }
  }
};

export const signup = async (
  req: Request,
  res: Response<{ user: any } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signUpWithEmail(email, password);

    if (error) {
      throw new ApiError(400, error.message);
    }

    if (!data?.user) {
      throw new ApiError(400, "Signup failed - no user data received");
    }

    res.status(200).json({ user: data.user });
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(
        new ApiError(
          500,
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during signup"
        )
      );
    }
  }
};

export const getMe = async (
  req: Request,
  res: Response<{ user: any } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new ApiError(401, "User not found");
    }
    res.status(200).json({ user });
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, "Failed to get user information")
    );
  }
};

export const logout = (
  req: Request,
  res: Response<{ message: string } | ErrorResponse>,
  next: NextFunction
) => {
  try {
    res.clearCookie("sb-access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    next(new ApiError(500, "Failed to logout"));
  }
};
