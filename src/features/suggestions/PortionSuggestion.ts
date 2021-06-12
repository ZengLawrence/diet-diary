import { Serving } from "../../model/Food";

export interface PortionSuggestion {
  foodName: string;
  portionSize: string;
  serving: Serving;
}
