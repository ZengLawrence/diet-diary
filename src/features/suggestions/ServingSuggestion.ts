import { FoodGroup } from "../../model/Food";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
  foodGroup: FoodGroup;
  bestChoice?: boolean;
}
