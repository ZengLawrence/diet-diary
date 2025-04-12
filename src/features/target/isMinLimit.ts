import { FoodGroup } from "../../model/Food";

export function isMinLimit(foodGroup: FoodGroup, unlimitedFruit: boolean) {
  return (foodGroup === "vegetable"
    || (foodGroup == "fruit" && unlimitedFruit)
  );
}
