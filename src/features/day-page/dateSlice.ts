import { createSlice } from "@reduxjs/toolkit";
import diary from "../../model/diary";

function today() {
  return diary.newDay().date;
}

const dateSlice = createSlice({
  name: "date",
  initialState: today(),
  reducers: {
    newDay() {
      return today();
    }
  }
})

export const { newDay } = dateSlice.actions;
export default dateSlice.reducer;