import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRoom } from "../model";
import {
  createRoomThunk,
  getAllRoomThunk,
  getByIdRoomThunk,
} from "../api/RoomApi";

interface IRoomState {
  rooms: IRoom[];
  room: IRoom | null;
  time: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IRoomState = {
  rooms: [],
  time: null,
  room: null,
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom | null>) => {
      state.room = action.payload;
    },
    createRoom: (state, action: PayloadAction<IRoom>) => {
      const roomExists = state.rooms.some(
        (room) => room.id === action.payload.id
      );
      if (!roomExists) {
        state.rooms.push(action.payload);
      }
    },

    updateRoom: (state, action: PayloadAction<IRoom>) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload.id);
    },
    setTime: (state, action: PayloadAction<number | null>) => {
      state.time = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ***createRoomThunk
      .addCase(createRoomThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createRoomThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createRoomThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.message ?? "Unknow error";
      })

      // ***getAllRoomThunk
      .addCase(getAllRoomThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAllRoomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload.data;
      })
      .addCase(getAllRoomThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.message ?? "Unknow error";
      })

      // ***getByIdRoomThunk
      .addCase(getByIdRoomThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getByIdRoomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.room = action.payload.data;
      })
      .addCase(getByIdRoomThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.message ?? "Unknow error";
      });
  },
});

export const { setRoom, createRoom, updateRoom, setTime } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
