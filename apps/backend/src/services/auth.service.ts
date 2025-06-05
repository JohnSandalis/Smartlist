import supabase from "../utils/supabase";

class AuthServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthServiceError";
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new AuthServiceError(
      error instanceof Error ? error.message : "Failed to sign in with email"
    );
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const response = await supabase.auth.signUp({ email, password });
    return response;
  } catch (error) {
    throw new AuthServiceError(
      error instanceof Error ? error.message : "Failed to sign up with email"
    );
  }
}
