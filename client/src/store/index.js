import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/reducers/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
