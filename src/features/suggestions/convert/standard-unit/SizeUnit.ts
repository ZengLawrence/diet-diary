import type { Measure, Unit } from "convert-units";

export type SizeSystems = "size";

export type SizeUnits =
  | "small"
  | "medium"
  | "large";

const size: Record<SizeUnits, Unit> = {
  small: {
    name: {
      singular: 'Small',
      plural: 'Small',
    },
    to_anchor: 0.75,
  },
  medium: {
    name: {
      singular: 'Medium',
      plural: 'Medium',
    },
    to_anchor: 1,
  },
  large: {
    name: {
      singular: 'Large',
      plural: 'Large',
    },
    to_anchor: 1.5,
  },
}

const measure: Measure<SizeSystems, SizeUnits> = {
  systems: {
    size,
  },
};

export default measure;