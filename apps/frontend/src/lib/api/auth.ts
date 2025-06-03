import baseAPI from "./baseAPI";
import { z } from "zod";

const authResponseSchema = z.object({
  error: z.string().optional(),
});
const authMeResponseSchema = z.object({
  user: z
    .object({
      id: z.string().uuid(),
      email: z.string().email().optional(),
      created_at: z.string(),
    })
    .optional(),
});

type AuthResponse = z.infer<typeof authResponseSchema>;
type AuthMeResponse = z.infer<typeof authMeResponseSchema>;

export async function authLogin(
  body: any,
  options?: RequestInit,
  onSuccess?: () => Promise<void>
): Promise<AuthResponse> {
  return baseAPI<AuthResponse>(
    "/auth/login",
    authResponseSchema,
    onSuccess
  ).post(body, {
    credentials: "include",
    ...options,
  });
}

export async function authSignup(
  body: any,
  options?: RequestInit,
  onSuccess?: () => Promise<void>
): Promise<AuthResponse> {
  return baseAPI<AuthResponse>(
    "/auth/signup",
    authResponseSchema,
    onSuccess
  ).post(body, {
    credentials: "include",
    ...options,
  });
}

export async function authLogout(
  options?: RequestInit,
  onSuccess?: () => Promise<void>
): Promise<AuthResponse> {
  return baseAPI<AuthResponse>(
    "/auth/logout",
    authResponseSchema,
    onSuccess
  ).post(null, {
    credentials: "include",
    ...options,
  });
}

export async function authMe(
  options?: RequestInit,
  onSuccess?: (parsedData: AuthMeResponse) => Promise<void>,
  onError?: (error: Error) => Promise<void>
): Promise<AuthMeResponse> {
  const response = await baseAPI<AuthMeResponse>(
    "/auth/me",
    authMeResponseSchema,
    onSuccess,
    onError
  ).get({
    credentials: "include",
    ...options,
  });

  if (response === null) {
    return { user: undefined };
  }

  return response;
}
