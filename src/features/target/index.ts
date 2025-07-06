import { customTargetsLocalStorage } from "../../app/customTargetsLocalStorage";
import { CustomTargets } from "../../model/customTarget";

export const customTargets = new CustomTargets(customTargetsLocalStorage, customTargetsLocalStorage);