import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../model";
import {
  logoutThunk,
  refreshThunk,
  signInThunk,
  signUpThunk,
} from "../api/UserApi";

const initialState = {
  user: null as IUser | null,
  isLoading: false,
  error: null as string | null,
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
        state.user = action.payload.user;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ***signInThunk
      .addCase(signInThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })

      // ***refreshThunk
      .addCase(refreshThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
