import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const supportedLocales = ["en", "el"];

  const localeFromCookie = cookies().get("locale")?.value;

  const locale = supportedLocales.includes(localeFromCookie ?? "")
    ? localeFromCookie ?? "en"
    : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
