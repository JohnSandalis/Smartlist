"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

interface AuthParams {
  email: string;
  password: string;
}

export async function login({
  email,
  password,
}: AuthParams): Promise<string | void> {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({
  email,
  password,
}: AuthParams): Promise<string | void> {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
