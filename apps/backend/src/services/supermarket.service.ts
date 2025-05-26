import supabase from "../utils/supabase";

export const fetchSupermarkets = async () => {
  const supermarketsRes = await supabase.from("supermarkets").select("*");
  if (supermarketsRes.error || !supermarketsRes.data) return null;
  if (supermarketsRes.data.length === 0) return null;

  return {
    supermarkets: supermarketsRes.data,
  };
};
