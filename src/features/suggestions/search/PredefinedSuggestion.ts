import type { Serving } from "../../../model/Food";


export interface PredefinedSuggestion {
  foodName: string;
  amount: string;
  serving: Serving;
  bestChoice?: boolean;
}
