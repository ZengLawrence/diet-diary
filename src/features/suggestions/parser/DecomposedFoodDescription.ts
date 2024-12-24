import _ from 'lodash';
import parse from '../parser/foodDescription';

function isSpaceAfter(s: string, index: number) {
  return s.substring(index, index + 1) === " ";
}

function isEndedWithSpace(s: string) {
  return isSpaceAfter(s, _.size(s) - 1);
}

function isEndedWithRightParenthesis(s: string) {
  return s.substring(_.size(s) - 1, _.size(s)) === ")";
}

export default function decompose(foodDescription: string) {
  const { foodName, amount, measurement } = parse(foodDescription);
  const unitText = measurement?.unitText;
  const foodNameCompleted = isSpaceAfter(foodDescription, _.size(foodName));
  const unitCompleted = (amount && unitText) ? isEndedWithSpace(foodDescription) || isEndedWithRightParenthesis(foodDescription) : false;
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  };
}
export type DecomposedFoodDescription = ReturnType<typeof decompose>;
