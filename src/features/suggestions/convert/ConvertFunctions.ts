export interface ConvertFunctions<T> {
  isSupportedUnitType: (unit: any) => boolean;
  areUnitsConvertible: (fromUnit: T, toUnit: T) => boolean;
  convert: (quantity: number, unit: T, toUnit: T) => number;
}