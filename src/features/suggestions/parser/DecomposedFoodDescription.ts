import _ from 'lodash';
import parse from '../parser/foodDescription';

export default function decompose(foodDescription: string) {
  const { foodName, amount, measurement } = parse(foodDescription);
  const unitText = measurement?.unitText;
  // put a space after a word
  const foodNameCompleted = foodDescription.substring(_.size(foodName), _.size(foodName) + 1) === " ";
  const unitCompleted = (amount && unitText) ? foodDescription.substring(_.size(foodDescription) - 1, _.size(foodDescription)) === " " : false;
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  };
}
export type DecomposedFoodDescription = ReturnType<typeof decompose>;
