import _ from "lodash";
import { ConvertFunctions } from "./ConvertFunctions";

function selectFunction<T>(funcs: ConvertFunctions<T>[], fromUnit: T, toUnit: T) {
  return _.head(_.filter(funcs, function({areUnitsConvertible}) {
    return areUnitsConvertible(fromUnit, toUnit);
  }));
}

function areUnitsConvertible<T>(funcs: ConvertFunctions<T>[], fromUnit: T, toUnit: T) {
  const selectedFunc = selectFunction(funcs, fromUnit, toUnit);
  return selectedFunc ? true : false;
}

function convert<T>(funcs: ConvertFunctions<T>[], quantity: number, unit: T, toUnit: T) {
  const selectedFunc = selectFunction(funcs, unit, toUnit);
  if (selectedFunc) {
    return selectedFunc.convert(quantity, unit, toUnit);
  } else {
    return _.last(funcs)!.convert(quantity, unit, toUnit);
  }
}

export default function compose<T>(...funcs: ConvertFunctions<T>[]): ConvertFunctions<T> {
  return {
    areUnitsConvertible: _.partial(areUnitsConvertible, funcs),
    convert: _.partial(convert, funcs),
  }
}