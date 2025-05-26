"use client";

import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.refresh();
    router.push("/");
  };

  return logout;
}
