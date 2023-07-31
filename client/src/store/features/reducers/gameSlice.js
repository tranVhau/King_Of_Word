import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roundAnswer: {
    question_id: null,
    answer: null,
    duration: null,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateAnswer: (state, action) => {
      state.roundAnswer = action.payload;
    },
  },
});

export const { updateAnswer } = gameSlice.actions;
export default gameSlice.reducer;
