import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/shared";
import type { IAuthResponse, IUser, IUserAuthData } from "../model";
import type { IApiResponse } from "@/shared";
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
  UPDATE_USER = "user/updateUser",
}

export const signUpThunk = createAsyncThunk<
  IApiResponse<IAuthResponse>,
  IUserAuthData,
  { rejectValue: IApiResponse }
>(USER_THUNK_TYPES.SIGN_UP, async (formData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post(AUTH_API_ENDPOINTS.SIGN_UP, formData);
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const signInThunk = createAsyncThunk<
  IApiResponse<IAuthResponse>,
  IUserAuthData,
  { rejectValue: IApiResponse }
>(USER_THUNK_TYPES.SIGN_IN, async (formData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post(AUTH_API_ENDPOINTS.SIGN_IN, formData);
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const logoutThunk = createAsyncThunk<
  IApiResponse,
  void,
  { rejectValue: IApiResponse }
>(USER_THUNK_TYPES.LOGOUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api.post(AUTH_API_ENDPOINTS.LOGOUT);
    localStorage.removeItem("token");
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const refreshThunk = createAsyncThunk<
  IApiResponse<IAuthResponse>,
  void,
  { rejectValue: IApiResponse }
>(USER_THUNK_TYPES.REFRESH, async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api.get(AUTH_API_ENDPOINTS.REFRESH);
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const updateUserThunk = createAsyncThunk<
  IApiResponse<IUser>,
  { username: string },
  { rejectValue: IApiResponse }
>(USER_THUNK_TYPES.UPDATE_USER, async (updateData, { rejectWithValue }) => {
  try {
    const { data } = await $api.put("/user", updateData);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});