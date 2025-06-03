import { getApiBaseUrl } from "./getApiBaseUrl";
import { z } from "zod";

function withJson(body?: any): RequestInit {
  return body
    ? {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    : {};
}

export default function baseAPI<TResponse>(
  path: string,
  schema?: z.ZodSchema<TResponse>,
  onSuccess?: (data: TResponse) => Promise<void>,
  onError?: (error: Error) => Promise<void>
) {
  const baseUrl = getApiBaseUrl();

  async function handle(res: Response): Promise<TResponse> {
    let data: any;
    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await res.json();
    } else {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      const error = new Error(data?.message || "Request failed");

      if (!(res.status === 401 && path === "/auth/me")) {
        console.error(`API Error (${res.status}):`, error.message);
      }

      if (onError) {
        await onError(error);
      }

      if (res.status === 401 && path === "/auth/me") {
        return null as TResponse;
      }

      throw error;
    }

    let parsedData = data;
    if (schema) {
      try {
        parsedData = schema.parse(data);
      } catch (e) {
        console.error("Schema validation failed", e);
        throw new Error(
          "Invalid response format: " +
            (e instanceof z.ZodError ? e.message : "Unknown error")
        );
      }
    }

    if (onSuccess) {
      await onSuccess(parsedData);
    }

    return parsedData;
  }

  return {
    get: async (options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "GET",
        ...options,
      });
      return handle(res);
    },
    post: async (body?: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        ...withJson(body),
        ...options,
      });
      return handle(res);
    },
    put: async (body?: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "PUT",
        ...withJson(body),
        ...options,
      });
      return handle(res);
    },
    del: async (body?: any, options?: RequestInit) => {
      const res = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        ...withJson(body),
        ...options,
      });
      return handle(res);
    },
  };
}
