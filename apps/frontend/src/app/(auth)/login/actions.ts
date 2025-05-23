"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUser } from "@/context/UserContext";

interface AuthParams {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const { refreshSession } = useUser();

  const login = useCallback(
    async ({ email, password }: AuthParams) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        await refreshSession();
        router.push("/");
      } else {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Login failed");
      }
    },
    [router, refreshSession]
  );

  return login;
}

export function useSignup() {
  const router = useRouter();
  const { refreshSession } = useUser();

  const signup = useCallback(
    async ({ email, password }: AuthParams) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        await refreshSession();
        router.push("/");
      } else {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Signup failed");
      }
    },
    [router, refreshSession]
  );

  return signup;
}
