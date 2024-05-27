import _ from "lodash";
import { PortionSuggestion } from "./PortionSuggestion";
import breakfast from "./breakfast-portion.json";
import sandwich from "./sandwich-portion.json";
import salad from "./salad-portion.json";
import soup from "./soup-portion.json";
import mainCourse from "./main-course-portion.json";
import sideDish from "./side-dish-portion.json";
import snack from "./snack-portion.json";
import dessert from "./dessert-portion.json";
import beverage from "./beverage-portion.json";

function toSuggestion({foodName, portionSize, serving}: PortionSuggestion) {
  return {
    foodName,
    amount: portionSize,
    serving,
  }
}

export default _.concat<PortionSuggestion>(
  breakfast.portions,
  sandwich.portions,
  salad.portions,
  soup.portions,
  mainCourse.portions,
  sideDish.portions,
  snack.portions,
  dessert.portions,
  beverage.portions,
).map(toSuggestion);