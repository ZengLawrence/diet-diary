import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SummaryType } from "../../model/SummaryType";
import { newDay } from "./dateSlice";

const summaryTypeSlice = createSlice({
  name: "summaryType",
  initialState: "total" as SummaryType,
  reducers: {
    setSummaryType(_state, action: PayloadAction<SummaryType>) {
      return action.payload;
    }
  },
})

export const { setSummaryType } = summaryTypeSlice.actions;
export default summaryTypeSlice.reducer;