import { getApiBaseUrl } from "./getApiBaseUrl";
import { z } from "zod";

export default function baseAPI<TResponse>(
  path: string,
  schema?: z.ZodSchema<TResponse>
) {
  const baseUrl = getApiBaseUrl();

  async function handle(res: Response): Promise<TResponse> {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    if (schema) {
      try {
        return schema.parse(data);
      } catch (e) {
        console.error("Schema validation failed", e);
        throw new Error("Invalid response format");
      }
    }

    return data;
  }

  return {
    get: async (options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "GET",
        ...options,
      });
      return handle(res);
    },
    post: async (body: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      return handle(res);
    },
    put: async (body: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      return handle(res);
    },
    del: async (body: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      return handle(res);
    },
  };
}
