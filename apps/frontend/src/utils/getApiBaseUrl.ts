export const getApiBaseUrl = () => {
  const env = process.env.NEXT_PUBLIC_ENV;

  if (typeof window !== "undefined") {
    // Client-side (browser)
    if (env === "PRODUCTION") {
      return "https://api.smartlist.gr";
    }
    return "http://localhost:8080";
  }

  // Server-side (SSR/SSG)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
};
