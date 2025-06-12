
import { createSlice } from '@reduxjs/toolkit';
import type  { Lobby, LobbySchema } from '../types/lobbyTypes';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: LobbySchema = {
  lobbies: [],
  isLoading: false,
};

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setLobbies: (state, action: PayloadAction<Lobby[]>) => {
      state.lobbies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addLobby: (state, action: PayloadAction<Lobby>) => {
      state.lobbies.push(action.payload);
    },
  },
});

export const { actions: lobbyActions } = lobbySlice;
export const { reducer: lobbyReducer } = lobbySlice;