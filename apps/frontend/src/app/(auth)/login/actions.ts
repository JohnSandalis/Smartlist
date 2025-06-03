"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { getApiBaseUrl } from "@/lib/api/getApiBaseUrl";
import { authLogin, authSignup } from "@/lib/api/auth";

interface AuthParams {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const { refreshSession } = useUser();

  const login = useCallback(
    async ({ email, password }: AuthParams) => {
      const res = await authLogin(
        { email, password },
        {
          credentials: "include",
        },
        async () => {
          await refreshSession();
          router.push("/");
        }
      );
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
      const res = await authSignup(
        { email, password },
        {
          credentials: "include",
        },
        async () => {
          await refreshSession();
          router.push("/");
        }
      );
    },
    [router, refreshSession]
  );

  return signup;
}
