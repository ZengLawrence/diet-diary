import {parseFoodDescription} from "./foodDescription";

export const foodName = (phrase: string) => {
  const desc = parseFoodDescription(phrase) as {foodName: string};
  return desc.foodName;
}
