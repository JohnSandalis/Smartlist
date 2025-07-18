"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import AccountLoading from "./AccountLoading";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("account");
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return <AccountLoading />;

  return (
    <>
      <div className="flex flex-col items-start container-default">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center w-full mb-4 py-1 container-default gap-4">
          <h1 className="text-2xl font-bold">{t("title")}</h1>

          <button
            onClick={signOut}
            className="btn-white text-sm flex items-center gap-2"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            {t("logoutButton")}
          </button>
        </div>

        <div className="w-full max-w-2xl">
          {/* Personal Information Section */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("memberInfo.title")}
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">
                  {t("memberInfo.emailLabel")}
                </label>
                <p className="text-md font-medium">{user?.email}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">
                  {t("memberInfo.memberSinceLabel")}
                </label>
                <p className="text-md font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </section>

          {/* Account Settings Section */}
          {/* <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Ρυθμίσεις Λογαριασμού
            </h2>
            <div className="space-y-4 flex flex-col w-full justify-start">
              <button
                onClick={() => router.push("/account/change-password")}
                className="text-left text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Αλλαγή Κωδικού →
              </button>
              <button
                onClick={() => router.push("/account/delete")}
                className="text-left text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Διαγραφή Λογαριασμού →
              </button>
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
}
