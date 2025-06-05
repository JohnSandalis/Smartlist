import supabase from "../utils/supabase";
import { Category } from "@smartlist/types";

class CategoryServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CategoryServiceError";
  }
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      throw new CategoryServiceError(
        `Failed to fetch categories: ${error.message}`
      );
    }

    if (!data) {
      return [];
    }

    return data as Category[];
  } catch (error) {
    if (error instanceof CategoryServiceError) {
      throw error;
    }
    throw new CategoryServiceError(
      "An unexpected error occurred while fetching categories"
    );
  }
};

export const fetchCategory = async (uuid: number): Promise<Category> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("uuid", uuid)
      .single();

    if (error) {
      throw new CategoryServiceError(
        `Failed to fetch category: ${error.message}`
      );
    }

    if (!data) {
      throw new CategoryServiceError(`Category with UUID ${uuid} not found`);
    }

    return data as Category;
  } catch (error) {
    if (error instanceof CategoryServiceError) {
      throw error;
    }
    throw new CategoryServiceError(
      "An unexpected error occurred while fetching category"
    );
  }
};
