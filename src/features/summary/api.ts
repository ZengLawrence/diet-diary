import { Summary } from "../../model/summary";
import { diaryHistory } from "../day-page/api";
import { preferencesApi } from "../preference/api";

export const summary = new Summary(diaryHistory, preferencesApi);
export default summary;