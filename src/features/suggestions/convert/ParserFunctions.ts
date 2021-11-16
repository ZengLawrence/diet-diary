import _ from "lodash";

export interface ParserFunctions<T> {
  /**
   * Guard function to ensure the unitText is parsable.  Should be called before calling parse(string).
   */
  canParse: (unitText: string | undefined) => boolean;

  /**
   * Parse text into an unit.  Guard method canParse(string) should be called before calling this function, otherwise an error could be thrown.
   */
  parse: (unitText: string | undefined) => T;
}

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