"use client";

import Link from "next/link";
import RegisterForm from "@/components/form/Register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authMe } from "@/lib/api/auth";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("register");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await authMe(
        {
          credentials: "include",
        },
        async (parsedData) => {
          if (parsedData.user) {
            router.push("/");
          }
        }
      );
    };

    try {
      checkAuth();
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  return (
    <>
      <div className="flex min-h-full sm:mx-auto sm:w-full sm:max-w-sm flex-1 flex-col justify-center mt-2 px-4 py-6 lg:px-8 lg:py-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            {t("title")}
          </h2>
        </div>

        <div className="mt-2">
          <RegisterForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            {t("areYouAMember")}{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-primary hover:text-primary-light"
            >
              {t("areYouAMemberButton")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
