// features/lobby/services/lobbyThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type { Lobby } from '../types/lobbyTypes';
import  { $api, type IApiResponse } from '@/shared';
import type  { RootState } from '@/app/store/store'; 


export const fetchLobbies = createAsyncThunk<
  Lobby[], // Возвращаемый тип
  void, // Аргументы (пусто)
  {
    state: RootState; // Тип всего состояния
    rejectValue: string; // Тип ошибки
    extra: { api: typeof $api }; // Тип для extra (axios-инстанс)
  }
>('lobby/fetchLobbies', async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<IApiResponse<Lobby[]>>('/rooms');
    return response.data.data;
  } catch (e) {
    return rejectWithValue('Ошибка при загрузке лобби');
  }
});