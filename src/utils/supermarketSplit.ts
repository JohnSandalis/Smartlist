import { ShoppingCartItem, Product } from "@/app/page";

export interface CombinationResult {
  supermarkets: string[];
  total: number;
  [key: string]: any;
}

export default function getSupermarketSplit(
  shoppingList: ShoppingCartItem[]
): CombinationResult[] {
  // Helper function to find all unique supermarkets
  const uniqueSupermarkets = shoppingList.reduce<string[]>((acc, product) => {
    product.Prices.forEach((price) => {
      if (!acc.includes(price.store_name)) {
        acc.push(price.store_name);
      }
    });
    return acc;
  }, []);

  // Helper function to generate all combinations of supermarkets
  const getAllCombinations = (array: string[]): string[][] => {
    return array
      .reduce(
        (subsets: string[][], value: string) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .filter((subset) => subset.length > 0);
  };

  // Generate all non-empty combinations of supermarkets
  const allCombinations = getAllCombinations(uniqueSupermarkets);

  // Calculate the cheapest options for each combination
  const calculateCheapestOptions = (
    combination: string[]
  ): CombinationResult | null => {
    const result: CombinationResult = {
      supermarkets: combination,
      total: 0,
    };

    // Initialize stores in result
    combination.forEach((store) => {
      result[store] = [];
    });

    // Determine the cheapest option for each product within the current combination
    shoppingList.forEach((product) => {
      let cheapestPrice = Infinity;
      let cheapestStore: string | null = null;

      product.Prices.forEach((price) => {
        if (
          combination.includes(price.store_name) &&
          price.price < cheapestPrice
        ) {
          cheapestPrice = price.price;
          cheapestStore = price.store_name;
        }
      });

      // Only add the product if a store in the combination offers the cheapest price
      if (cheapestStore) {
        result[cheapestStore].push({
          ...product,
          price: cheapestPrice,
          quantity: product.quantity,
        });
        result.total += cheapestPrice * product.quantity;
      }
    });

    result.total = parseFloat(result.total.toFixed(2));

    // Validate if every store in the combination actually has products
    const hasEmptyStores = combination.some(
      (store) => result[store].length === 0
    );
    // Validate if all products are included in the combination
    const allProductsIncluded = shoppingList.every((product) =>
      combination.some((store) =>
        result[store].some((p: any) => p.id === product.id)
      )
    );

    // Return null if any store is empty or not all products are included
    return !hasEmptyStores && allProductsIncluded ? result : null;
  };

  // Filter out invalid combinations
  return allCombinations
    .map(calculateCheapestOptions)
    .filter((result): result is CombinationResult => result !== null);
}
