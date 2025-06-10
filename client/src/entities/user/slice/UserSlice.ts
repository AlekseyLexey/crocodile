import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../model";
import {
  logoutThunk,
  refreshThunk,
  signInThunk,
  signUpThunk,
} from "../api/UserApi";

type UserType = {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserType = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ***signUpThunk
      .addCase(signUpThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.message ?? "Unknow error";
      })

      // ***signInThunk
      .addCase(signInThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.message ?? "Unknow error";
      })

      // ***logoutThunk
      .addCase(logoutThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? "Unknow error";
      })

      // ***refreshThunk
      .addCase(refreshThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? "Unknow error";
      });
  },
});

export const userReducer = userSlice.reducer;
