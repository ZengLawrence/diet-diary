import _ from "lodash";

// food name ends with there is a number with space(s) around it or followed by end of line
export const foodName = (phrase: string) => _.trim(_.head(_.split(phrase, /\s{1}\d{1}(\s|$)/, 1)));
