import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultTargets, Target } from "../../model/Target";
import _ from "lodash";

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
            const i = _.findIndex(state.targets, { calorie: action.payload.calorie });
            if (i > -1) {
                state.targets[i] = action.payload;
            }
        },
    },
});

export const {
    updateTarget,
} = customTargetsSlice.actions;

export default customTargetsSlice.reducer;