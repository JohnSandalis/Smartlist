import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import subcategoryRoutes from "./routes/subcategory.routes";
import productRoutes from "./routes/product.routes";
import supermarketRoutes from "./routes/supermarket.routes";
import userPreferencesRoutes from "./routes/userPreferences.routes";
import shoppingListRoutes from "./routes/shoppingList.routes";

import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: isProduction ? "https://smartlist.gr" : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/supermarkets", supermarketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user-preferences", userPreferencesRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);

app.use(errorHandler);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Backend API is running on http://localhost:${port}`);
});
