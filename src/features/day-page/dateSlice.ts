import { createSlice } from "@reduxjs/toolkit";

function today() {
  return new Date().toLocaleDateString();
}

const dateSlice = createSlice({
  name: "date",
  initialState: today(),
  reducers: {
    newDay(state) {
      return today();
    }
  }
})

export const { newDay } = dateSlice.actions;
export default dateSlice.reducer;