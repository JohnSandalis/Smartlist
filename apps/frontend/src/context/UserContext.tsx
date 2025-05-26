"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

type User = {
  id: string;
  email?: string;
} | null;

interface UserContextType {
  user: User;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const res = await fetch(`${getApiBaseUrl()}/api/auth/me`, {
      credentials: "include",
    });
    if (res.ok) {
      const { user } = await res.json();
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const signOut = async () => {
    await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <UserContext.Provider value={{ user, isLoading, signOut, refreshSession }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
