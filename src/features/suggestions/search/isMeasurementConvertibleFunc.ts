import _ from "lodash";
import { isConvertible, Unit } from "../Unit";

export function isMeasurementConvertibleFunc(fromUnit: Unit) {
  return (measurement: { unit?: Unit; }) => {
    const { unit: toUnit } = measurement;
    if (_.isUndefined(toUnit))
      return false;

    return isConvertible(fromUnit, toUnit);
  };
}
