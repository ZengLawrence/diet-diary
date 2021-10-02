import {parseFoodDescription} from "./foodDescription";

export const foodName = (phrase: string) => {
  const desc = parseFoodDescription(phrase) as {foodName: String};
  return desc.foodName;
}
