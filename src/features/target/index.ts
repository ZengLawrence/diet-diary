import { customTargetsLocalStorage } from "../../app/customTargetsLocalStorage";
import { CustomTargets } from "../../model/customTarget";
import { Targets } from "../../model/targets";

export const customTargets = new CustomTargets(customTargetsLocalStorage, customTargetsLocalStorage);
export const targetsApi = new Targets(customTargets);