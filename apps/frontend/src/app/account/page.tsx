"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import BackButton from "@/components/ui/BackButton";

export default function AccountPage() {
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <BackButton href="/" />
        <button onClick={signOut} className="btn-white text-sm">
          Log out
        </button>
      </div>

      <div className="flex flex-col items-start">
        <div className="py-4">
          <p className="text-md">Email: {user?.email}</p>
        </div>
      </div>
    </>
  );
}
