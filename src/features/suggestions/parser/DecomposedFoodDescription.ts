import _ from 'lodash';
import parse from '../parser/foodDescription';

export default function decompose(foodDescription: string) {
  const { foodName, amount, measurement } = parse(foodDescription);
  const unitText = measurement?.unitText;
  // put a space after a word
  const foodNameCompleted = foodDescription.substr(_.size(foodName), 1) === " ";
  const unitCompleted = (amount && unitText) ? foodDescription.substr(_.size(foodDescription) - 1, 1) === " " : false;
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  };
}
export type DecomposedFoodDescription = ReturnType<typeof decompose>;
