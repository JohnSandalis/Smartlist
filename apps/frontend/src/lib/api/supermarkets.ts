import baseAPI from "@/lib/api/baseAPI";
import { supermarketsSchema, type Supermarkets } from "@smartlist/schemas";

export async function fetchSupermarkets(
  options?: RequestInit
): Promise<Supermarkets> {
  return baseAPI<Supermarkets>(`/supermarkets`, supermarketsSchema).get(
    options
  );
}
