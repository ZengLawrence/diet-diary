import _ from "lodash";
import { start } from "repl";

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
  const foodNameRegex = /^(.*?)\s+(\d[\d\.\/]*|\.\d+|\d+-[a-zA-Z]+)(?=\s|$)/;
  const match = input.match(foodNameRegex);
  if (match) {
    const foodName = match[1];
    // there is no indices support for capturing groups in javascript regex
    // take the length of the first capturing group to slice the rest string and trim leading spaces
    const rest = input.slice(match[1].length).trimStart();
    const amount = rest.length > 0 ? rest : undefined;
    const foodNameCompleted = true;
    const unit = parseUnit(amount);
    const unitCompleted = unit ? isUnitCompleted(unit) : false;
    return {
      foodName,
      amount: amount ? amount.trimEnd() : undefined,
      foodNameCompleted,
      unitCompleted,
    };
  } else { 
    const foodName = input.trimEnd();
    const foodNameCompleted = isSpaceAfter(input, _.size(foodName));
    return {
      foodName,
      amount: undefined,
      foodNameCompleted,
      unitCompleted: false,
    };
  }
}