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