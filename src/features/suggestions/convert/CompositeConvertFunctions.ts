import _ from "lodash";
import { ConvertFunctions } from "./ConvertFunctions";

function isSupportedUnitType<T>(funcs: ConvertFunctions<T>[], unit: any) {
  const selected = _.head(_.filter(funcs, function ({ isSupportedUnitType }) {
    return isSupportedUnitType(unit);
  }));
  return selected ? true : false;
}

function selectFunction<T>(funcs: ConvertFunctions<T>[], fromUnit: T, toUnit: T) {
  return _.head(_.filter(funcs, function ({ isSupportedUnitType, areUnitsConvertible }) {
    return isSupportedUnitType(fromUnit)
      && isSupportedUnitType(toUnit)
      && areUnitsConvertible(fromUnit, toUnit);
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
    return NaN;
  }
}

export default function compose<T>(...funcs: ConvertFunctions<any>[]): ConvertFunctions<T> {
  return {
    isSupportedUnitType: _.partial(isSupportedUnitType, funcs),
    areUnitsConvertible: _.partial(areUnitsConvertible, funcs),
    convert: _.partial(convert, funcs),
  }
}