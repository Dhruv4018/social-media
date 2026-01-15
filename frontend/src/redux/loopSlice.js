import { createSlice } from "@reduxjs/toolkit";

const LoopSlice = createSlice({
    name: "loop",
    initialState: {
        loopData: [],

    },
    reducers: {
        setLoopData: (state, action) => {
            state.loopData = action.payload
        }
    }
})

export const { setLoopData } = LoopSlice.actions
export default LoopSlice.reducer