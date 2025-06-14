import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/shared";
import type { IRoom, ICreateRoom } from "../model";
import type { IApiResponse } from "@/shared";
import type { AxiosError } from "axios";

const ROOM_API_ENDPOINTS = "/rooms";

enum ROOM_THUNK_TYPES {
  CREATE = "room/create",
  GET_ALL = "room/getAll",
  GET_BY_ID = "room/getById",
  UPDATE = "room/update",
}

export const createRoomThunk = createAsyncThunk<
  IApiResponse<IRoom>,
  ICreateRoom,
  { rejectValue: IApiResponse }
>(ROOM_THUNK_TYPES.CREATE, async (formData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post(ROOM_API_ENDPOINTS, formData);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const getAllRoomThunk = createAsyncThunk<
  IApiResponse<IRoom[]>,
  void,
  { rejectValue: IApiResponse }
>(ROOM_THUNK_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api.get(ROOM_API_ENDPOINTS);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});

export const getByIdRoomThunk = createAsyncThunk<
  IApiResponse<IRoom>,
  number,
  { rejectValue: IApiResponse }
>(ROOM_THUNK_TYPES.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await $api.get(`${ROOM_API_ENDPOINTS}/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;
    return rejectWithValue(axiosError.response!.data);
  }
});
