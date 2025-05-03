import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultTargets, Target, update } from "../../model/customTarget";

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