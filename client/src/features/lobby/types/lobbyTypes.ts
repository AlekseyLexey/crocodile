
export interface Lobby {
  id: number;
  name: string;
  pictures: string;
  status: string;
  owner_id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LobbySchema {
  lobbies: Lobby[];
  isLoading: boolean;
  error?: string;
}