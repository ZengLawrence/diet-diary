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

function isUnitCompleted(foodDescription: string, amount: string | undefined, unitText: string | undefined) {
    if (amount && unitText) {
      return isEndedWithSpace(foodDescription) || isEndedWithRightParenthesis(foodDescription);
    }
    return false;
}

export default function decompose(foodDescription: string) {
  const parsed = parse(foodDescription);
  const { foodName, amount, measurement } = parsed;
  const unitText = measurement?.unitText;
  const foodNameCompleted = isSpaceAfter(foodDescription, _.size(foodName));
  const unitCompleted = isUnitCompleted(foodDescription, amount, unitText);
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  };
}
export type DecomposedFoodDescription = ReturnType<typeof decompose>;
