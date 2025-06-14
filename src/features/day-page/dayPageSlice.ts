import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import diary, { DayPage } from "../../model/diary";

const dayPageSlice = createSlice({
  name: 'dayPage',
  initialState: diary.newDay(),
  reducers: {
    setDayPage(_state, action: PayloadAction<DayPage>) {
      return action.payload;
    },
  },
});

export const { setDayPage } = dayPageSlice.actions;
export default dayPageSlice.reducer;