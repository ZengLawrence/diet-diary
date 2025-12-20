import _ from "lodash";
import type { ReadOnlyCustomTargets } from "./customTarget";
import type { Gender, Target} from "./Target";
import { manTarget, womanTarget } from "./Target";

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