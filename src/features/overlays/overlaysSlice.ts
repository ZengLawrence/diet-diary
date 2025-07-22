import { createSlice } from "@reduxjs/toolkit";

interface OverlaysState {
  showType: "preferences" | "customTargets" | undefined;
}

const initialState: OverlaysState = {
  showType: undefined,
};

const overlaysSlice = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    openPreferences(state) {
      state.showType = "preferences";
    },
    closePreferences(state) {
      state.showType = undefined;
    },
    openCustomTargets(state) {
      state.showType = "customTargets";
    },
    closeCustomTargets(state) {
      state.showType = undefined;
    },
  },
});

export const {
  openPreferences,
  closePreferences,
  openCustomTargets,
  closeCustomTargets,
} = overlaysSlice.actions;

export default overlaysSlice.reducer;