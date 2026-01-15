import { createSlice } from "@reduxjs/toolkit";

const StorySlice = createSlice({
    name: "story",
    initialState: {
        storyData: [],
        storyList:null,
        currentUserStory:null

    },
    reducers: {
        setStoryData: (state, action) => {
            state.storyData = action.payload
        },
        setStoryList: (state, action) => {
            state.storyList = action.payload
        },
        setCurrentUserStory: (state, action) => {
            state.currentUserStory = action.payload
        },

    }
})

export const {  setStoryData  , setStoryList , setCurrentUserStory} = StorySlice.actions
export default StorySlice.reducer