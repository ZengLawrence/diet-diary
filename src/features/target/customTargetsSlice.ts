import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { update } from "../../model/customTarget";
import { defaultTargets, Target } from "../../model/Target";

interface CustomTargetsState {
    targets: Target[],
}

const initialState: CustomTargetsState = {
    targets: defaultTargets(),
}

const customTargetsSlice = createSlice({
    name: "targetState",
    initialState,
    reducers: {
        updateTarget(state, action: PayloadAction<Target>) {
            update(state.targets, action.payload);
        },
    },
});

export const {
    updateTarget,
} = customTargetsSlice.actions;

export default customTargetsSlice.reducer;