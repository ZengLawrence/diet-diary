import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { DayPage, Today } from "../../model/diary";

const todayLocalStorage = new TodayLocalStorage();
const today = new Today(todayLocalStorage, todayLocalStorage);

const dayPageSlice = createSlice({
  name: 'dayPage',
  initialState: today.newDay(),
  reducers: {
    setDayPage(_state, action: PayloadAction<DayPage>) {
      return action.payload;
    },
  },
});

export const { setDayPage } = dayPageSlice.actions;
export default dayPageSlice.reducer;