"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api/getApiBaseUrl";
import { authLogout, authMe } from "@/lib/api/auth";

type User = {
  id: string;
  email?: string;
  created_at: string;
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
    await authMe(
      {
        credentials: "include",
      },
      async (parsedData) => {
        setUser(parsedData.user || null);
      },
      async (error) => {
        setUser(null);
      }
    );
  }, []);

  useEffect(() => {
    try {
      refreshSession();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [refreshSession]);

  const signOut = async () => {
    try {
      await authLogout(undefined, async () => {
        setUser(null);
      });
    } catch (error) {
      console.error(error);
    }
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
