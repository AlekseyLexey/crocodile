import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRoom } from "../model";

interface IRoomState {
  room: IRoom | null;
}

const initialState: IRoomState = {
  room: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom | null>) => {
      state.room = action.payload;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
