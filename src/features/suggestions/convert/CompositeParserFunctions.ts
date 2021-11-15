import _ from "lodash";
import { ParserFunctions } from "./ParserFunctions";

function selectFunction<T>(funcs: ParserFunctions<T>[], unitText: string | undefined) {
  return _.head(_.filter(funcs, function({canParse}) {
    return canParse(unitText);
  }));
}

function canParse<T>(funcs: ParserFunctions<T>[], unitText: string | undefined) {
  const selectedFunc = selectFunction(funcs, unitText);
  return selectedFunc ? true : false;
}

function parse<T>(funcs: ParserFunctions<T>[], unitText: string | undefined) {
  const selectedFunc = selectFunction(funcs, unitText);
  if (selectedFunc) {
    return selectedFunc.parse(unitText);
  } else {
    return _.last(funcs)!.parse(unitText);
  }
}

export default function compose<T>(...funcs: ParserFunctions<T>[]): ParserFunctions<T> {
  return {
    canParse: _.partial(canParse, funcs),
    parse: _.partial(parse, funcs),
  };
}