export interface ConvertFunctions<T> {
  areUnitsConvertible: (fromUnit: T, toUnit: T) => boolean;
  convert: (quantity: number, unit: T, toUnit: T) => number;
}