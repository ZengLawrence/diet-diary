import _ from "lodash";

export type DecomposedFoodDescription = {
    foodName: string;
    amount: string | undefined;
    foodNameCompleted: boolean;
    unitCompleted: boolean;
}

function isSpaceAfter(s: string, index: number) {
  return s.substring(index, index + 1) === " ";
}

function isEndedWithSpace(s: string) {
  return isSpaceAfter(s, _.size(s) - 1);
}

function isEndedWithRightParenthesis(s: string) {
  return s.substring(_.size(s) - 1, _.size(s)) === ")";
}

function isUnitCompleted(foodDescription: string) {
  return isEndedWithSpace(foodDescription) || isEndedWithRightParenthesis(foodDescription);
}

function parseUnit(s: string | undefined): string | undefined {
  const unitRegex = /(?<=\d[\d\.\/]*\s+)(.+)/;
  const match = s?.match(unitRegex);
  if (match) {
    return match[0];
  }
  return undefined;
}

export default function parse(input: string): DecomposedFoodDescription {
  const foodNameRegex = /^([-a-zA-Z\s,]+|\d+%|\([a-zA-Z]+\))+/;
  const match = input.match(foodNameRegex);
  if (match) {
    const foodName = match[0].trimEnd();
    const rest = input.slice(match[0].length);
    const amount = rest.length > 0 ? rest : undefined;
    const foodNameCompleted = isSpaceAfter(input, _.size(foodName));
    const unit = parseUnit(amount);
    const unitCompleted = unit ? isUnitCompleted(unit) : false;
    return {
      foodName,
      amount: amount ? amount.trimEnd() : undefined,
      foodNameCompleted,
      unitCompleted,
    };
  } else { 
    return {
      foodName: input,
      amount: undefined,
      foodNameCompleted: false,
      unitCompleted: false,
    };
  }
}