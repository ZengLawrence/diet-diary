import _ from "lodash";

export const foodName = (phrase: string) => _.trim(_.head(_.split(phrase, /\s{1}\d/, 1)));
