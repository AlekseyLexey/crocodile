import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../model';
import {
  logoutThunk,
  refreshThunk,
  signInThunk,
  signUpThunk,
  updateUserThunk,
} from '../api/UserApi';

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
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload!.message ?? 'Unknow error';
      })

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
        state.error = action.payload!.message ?? 'Unknow error';
      })

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
        state.error = action.payload?.message ?? 'Unknow error';
      })

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
        state.error = action.payload?.message ?? 'Unknow error';
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Ошибка при изменении имени';
      });
  },
});

export const userReducer = userSlice.reducer;
