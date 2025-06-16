import { z } from "zod";

export const getProductsSchema = z.object({
  query: z.object({
    subCategoryId: z
      .string()
      .transform(Number)
      .pipe(z.number().min(0, "Positive integer sub-category id is required")),
    start: z
      .string()
      .transform(Number)
      .pipe(z.number().min(0, "Start must be a non-negative number")),
    end: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1, "End must be a positive number")),
  }),
});

export const getProductsByCategorySchema = z.object({
  query: z.object({
    categoryId: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1, "Positive integer category id is required")),
    start: z
      .string()
      .transform(Number)
      .pipe(z.number().min(0, "Start must be a non-negative number")),
    end: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1, "End must be a positive number")),
  }),
});

export const getProductsByBarcodesSchema = z.object({
  body: z.object({
    barcodes: z.array(z.string()).min(1, "At least one barcode is required"),
  }),
});

export const searchProductsSchema = z.object({
  query: z.object({
    query: z.string().min(1, "Search query is required"),
  }),
});

export const getProductByBarcodeSchema = z.object({
  query: z.object({
    barcode: z
      .string()
      .regex(/^\d+$/, "Barcode must only contain numbers")
      .min(1, "Barcode is required"),
  }),
});
