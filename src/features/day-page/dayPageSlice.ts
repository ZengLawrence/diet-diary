import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import diary, { DayPage } from "../../model/diary";
import { back, next } from "./pageOptionsSlice";

const dayPageSlice = createSlice({
  name: 'dayPage',
  initialState: diary.newDay(),
  reducers: {
    setDayPage(_state, action: PayloadAction<DayPage>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(back.fulfilled, (state, action) => {
      return action.payload.day;
    })
    .addCase(next.fulfilled, (_state, action) => {
      return action.payload.day;
    });
  },
});

export const { setDayPage } = dayPageSlice.actions;
export default dayPageSlice.reducer;