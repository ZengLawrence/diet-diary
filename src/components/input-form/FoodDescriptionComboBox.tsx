import { Suggestion } from "../../features/suggestions/Suggestion";
import { Serving } from "../../model/Food";

interface Props {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodDescription: (desc: string) => void;
  updateFoodDescriptionServing: (desc: string, serving?: Serving) => void;
}

export const FoodDescriptionInputControl = (props: Props) => {
  return (
    <div />
  );
}
