import { createSlice } from "@reduxjs/toolkit";

interface OverlaysState {
  showPreferences: boolean;
  showCustomTargets: boolean;
}

const initialState: OverlaysState = {
  showPreferences: false,
  showCustomTargets: false,
};

const overlaysSlice = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    openPreferences(state) {
      state.showPreferences = true;
    },
    closePreferences(state) {
      state.showPreferences = false;
    },
    openCustomTargets(state) {
      state.showCustomTargets = true;
    },
    closeCustomTargets(state) {
      state.showCustomTargets = false;
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