export interface ConvertFunctions<T> {
  isMeasurementConvertible: (fromUnit: T, measurement: { unit: T; }) => boolean;
  convert: (quantity: number, unit: T, toUnit: T) => number;
}