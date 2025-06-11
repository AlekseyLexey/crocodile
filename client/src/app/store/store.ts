import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/user";
import {canvasReducer} from "@/entities/canvas/slice/canvasSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    canvas: canvasReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
