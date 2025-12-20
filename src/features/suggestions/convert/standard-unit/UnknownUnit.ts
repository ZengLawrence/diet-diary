import type { Measure, Unit } from "convert-units";

export type UnknownSystems = "unknown";

export type UnknownUnits = "unknown";

const unknown: Record<UnknownUnits, Unit> = {
  unknown: {
    name: {
      singular: 'Unknown',
      plural: 'Unknown',
    },
    to_anchor: 1,
  },
}

const measure: Measure<UnknownSystems, UnknownUnits> = {
  systems: {
    unknown,
  },
};

export default measure;