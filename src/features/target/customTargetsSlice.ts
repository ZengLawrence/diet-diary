import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Target, mutation } from "../../model/customTarget";

interface CustomTargetsState {
    targets: Target[],
}

const initialState: CustomTargetsState = {
    targets: mutation.initTargets(),
}

const customTargetsSlice = createSlice({
    name: "targetState",
    initialState,
    reducers: {
        updateTarget(state, action: PayloadAction<Target>) {
            mutation.update(state.targets, action.payload);
        },
    },
});

export const {
    updateTarget,
} = customTargetsSlice.actions;

export default customTargetsSlice.reducer;