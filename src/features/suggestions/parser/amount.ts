import { parseFoodDescription } from "./foodDescription";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

export function parseAmount(amount: string) {
  const { quantity, unit } = parseFoodDescription(mockFoodDescription(amount));
  return {
    quantity: quantity || 0,
    unit: unit || "",
  };
}