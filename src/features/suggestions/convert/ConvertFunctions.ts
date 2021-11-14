export interface ConvertFunctions<T> {
  isMeasurementConvertible: (fromUnit: T, toUnit: T) => boolean;
  convert: (quantity: number, unit: T, toUnit: T) => number;
}