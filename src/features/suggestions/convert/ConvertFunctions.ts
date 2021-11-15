import _ from "lodash";

export interface ConvertFunctions<T> {
  /**
   * Type guard function to check the type before calling areUnitsConvertible and convert functions.
   */
  isSupportedUnitType: (unit: any) => boolean;

  /**
   * Check if units are convertible.  It is used safe guard calling convert function.
   */
  areUnitsConvertible: (fromUnit: T, toUnit: T) => boolean;

  /**
   * Convert quantity from one unit to another.  Should call areUnitsConvertible to check if units are convertible before calling this function.
   */
  convert: (quantity: number, unit: T, toUnit: T) => number;
}

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