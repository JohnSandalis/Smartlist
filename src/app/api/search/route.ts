import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  // Validate input
  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        barcode,
        name,
        image,
        category,
        supplier:suppliers (name),
        prices (
          merchant_uuid,
          price,
          price_normalized,
          date,
          unit
        )
      `
      )
      .ilike("name", `%${query}%`)
      .limit(10);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
