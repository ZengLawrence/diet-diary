import _ from "lodash";
import { PortionSuggestion } from "../PortionSuggestion";
import { portions as breakfastPortions } from "./breakfast-portion.json";
import { portions as sandwichPortions } from "./sandwich-portion.json";
import { portions as saladPortions } from "./salad-portion.json";
import { portions as soupPortions } from "./soup-portion.json";
import { portions as mainCoursePortions } from "./main-course-portion.json";
import { portions as sideDishPortions } from "./side-dish-portion.json";
import { portions as snackPortions } from "./snack-portion.json";
import { portions as dessertPortions } from "./dessert-portion.json";

export default _.concat<PortionSuggestion>(
  breakfastPortions,
  sandwichPortions,
  saladPortions,
  soupPortions,
  mainCoursePortions,
  sideDishPortions,
  snackPortions,
  dessertPortions,
);