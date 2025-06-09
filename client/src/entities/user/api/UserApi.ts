import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/shared";
import type { IAuthResponse, IUserAuthData } from "../model";
import type { AxiosError } from "axios";

enum AUTH_API_ENDPOINTS {
  SIGN_UP = "/registration",
  SIGN_IN = "/login",
  LOGOUT = "/logout",
  REFRESH = "/refresh",
}

enum USER_THUNK_TYPES {
  SIGN_UP = "user/signUp",
  SIGN_IN = "user/signIn",
  LOGOUT = "user/logout",
  REFRESH = "user/refresh",
}

export const signUpThunk = createAsyncThunk<IAuthResponse, IUserAuthData>(
  USER_THUNK_TYPES.SIGN_UP,
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post(AUTH_API_ENDPOINTS.SIGN_UP, formData);
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);

export const signInThunk = createAsyncThunk<IAuthResponse, IUserAuthData>(
  USER_THUNK_TYPES.SIGN_IN,
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post(AUTH_API_ENDPOINTS.SIGN_IN, formData);
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  USER_THUNK_TYPES.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await $api.post(AUTH_API_ENDPOINTS.LOGOUT);
      localStorage.removeItem("token");
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);

export const refreshThunk = createAsyncThunk<IAuthResponse, void>(
  USER_THUNK_TYPES.REFRESH,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(AUTH_API_ENDPOINTS.REFRESH);
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);
