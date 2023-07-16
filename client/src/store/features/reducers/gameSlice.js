import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFindMatch: false,
  roomInfo: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateRoom: (state, action) => {
      state.isFindMatch = action.payload.isFindMatch;
      state.roomInfo = action.payload;
    },
    // leaveGame: () => {
    //   state.isFindMatch = false;
    //   state.room.roomID = action.payload.roomID;
    // },
  },
});

export const { updateRoom } = gameSlice.actions;
export default gameSlice.reducer;
