import supabase from "../utils/supabase";

class SupermarketServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupermarketServiceError";
  }
}

export const fetchSupermarkets = async () => {
  const supermarketsRes = await supabase.from("supermarkets").select("*");
  if (supermarketsRes.error || !supermarketsRes.data) {
    throw new SupermarketServiceError(
      `Failed to fetch supermarkets: ${supermarketsRes.error.message}`
    );
  }
  if (supermarketsRes.data.length === 0) {
    throw new SupermarketServiceError("No supermarkets found");
  }

  return {
    supermarkets: supermarketsRes.data,
  };
};
