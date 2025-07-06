import _ from "lodash";
import { ReadOnlyCustomTargets } from "./customTarget";
import { Gender, manTarget, Target, womanTarget } from "./Target";

export class Targets {
  constructor(private customTargets: ReadOnlyCustomTargets) { }

  getByGender(gender: Gender): Target[] {
    const allTargets = this.customTargets.getAll();
    if (gender == "woman") {
      return _.filter(allTargets, womanTarget);
    } else {
      return _.filter(allTargets, manTarget);
    }
  }
}