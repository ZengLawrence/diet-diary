import { FoodGroup } from "../../model/Food";

export function isMinLimit(foodGroup: FoodGroup, unlimitedFruit: boolean = true) {
  return (foodGroup === "vegetable"
    || (foodGroup == "fruit" && unlimitedFruit)
  );
}
