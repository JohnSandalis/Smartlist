"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<"en" | "el" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as "en" | "el" | undefined;

    if (cookieLocale === "en" || cookieLocale === "el") {
      setLocale(cookieLocale);
    } else {
      setLocale("en");
    }
    setLoading(false);
  }, []);

  function changeLanguage(newLocale: "en" | "el") {
    document.cookie = `locale=${newLocale}; path=/; max-age=${31536000}`;
    setLocale(newLocale);
    router.refresh();
  }

  if (loading) {
    return (
      <div className="w-[4rem] h-8 rounded-md bg-gray-300 animate-pulse"></div>
    );
  }

  return (
    <select
      value={locale ?? "en"}
      onChange={(e) => changeLanguage(e.target.value as "en" | "el")}
      className="w-[4rem] h-8 rounded-md bg-transparent border-none focus:ring-0 cursor-pointer"
    >
      <option value="en">🇺🇸 EN</option>
      <option value="el">🇬🇷 EL</option>
    </select>
  );
}
