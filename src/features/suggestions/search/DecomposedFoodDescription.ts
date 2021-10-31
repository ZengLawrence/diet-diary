import _ from 'lodash';
import parse from '../parser/foodDescription';

export default function decompose(foodDescription: string) {
  const { foodName, amount } = parse(foodDescription);
  // put a space after a word
  const foodNameCompleted = foodDescription.substr(_.size(foodName), 1) === " ";
  const unitCompleted = amount ? foodDescription.substr(_.size(foodDescription) - 1, 1) === " " : false;
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  };
}
export type DecomposedFoodDescription = ReturnType<typeof decompose>;
