import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import customTarget, { Target } from "../../model/customTarget";
interface CustomTargetsState {
    targets: Target[],
}

const initialState: CustomTargetsState = {
    targets: customTarget.initTargets(),
}

const customTargetsSlice = createSlice({
    name: "targetState",
    initialState,
    reducers: {
        updateTarget(state, action: PayloadAction<Target>) {
            customTarget.update(state.targets, action.payload);
        },
    },
});

export const {
    updateTarget,
} = customTargetsSlice.actions;

export default customTargetsSlice.reducer;