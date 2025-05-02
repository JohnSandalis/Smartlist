import { ShoppingCartItem } from "@smartlist/types";
import { CombinationResult } from "@smartlist/types";

export default function getSupermarketSplit(
  shoppingList: ShoppingCartItem[]
): CombinationResult[] {
  // Helper function to find all unique supermarkets
  const uniqueSupermarkets = shoppingList.reduce<number[]>((acc, product) => {
    const productWithPrices = shoppingList.find(
      (p) => p.barcode === product.barcode
    );

    if (productWithPrices) {
      productWithPrices.prices.forEach((price) => {
        if (!acc.includes(price.merchant_uuid)) {
          acc.push(price.merchant_uuid);
        }
      });
    }
    return acc;
  }, []);

  // Helper function to generate all combinations of supermarkets
  const getAllCombinations = (array: number[]): number[][] => {
    return array
      .reduce(
        (subsets: number[][], value: number) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .filter((subset) => subset.length > 0);
  };

  // Generate all non-empty combinations of supermarkets
  const allCombinations = getAllCombinations(uniqueSupermarkets);

  // Calculate the cheapest options for each combination
  const calculateCheapestOptions = (
    combination: number[]
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
      let cheapestStore: number | null = null;

      if (product) {
        product.prices.forEach((price) => {
          if (
            combination.includes(price.merchant_uuid) &&
            price.price < cheapestPrice
          ) {
            cheapestPrice = price.price;
            cheapestStore = price.merchant_uuid;
          }
        });

        // Only add the product if a store in the combination offers the cheapest price
        if (cheapestStore !== null) {
          result[cheapestStore].push(product);
          result.total += cheapestPrice * product.quantity;
        }
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
        result[store].some((p: any) => p.barcode === product.barcode)
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
