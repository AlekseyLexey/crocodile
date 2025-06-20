import type { ROOM_STATUSES } from '@/shared';

export type StatusRoomType =
  | ROOM_STATUSES.PREPARE
  | ROOM_STATUSES.ACTIVE
  | ROOM_STATUSES.PAUSE
  | ROOM_STATUSES.END;

export interface IRoomUser {
  id: number;
  username: string;
  point: number;
  UserRoom: IUserRoom;
}

export interface IUserRoom {
  point: number;
  is_lead: boolean;
}

export type TypeGame = 'mono' | 'multi';

export interface IRoom extends ICreateRoom {
  id: number;
  status: StatusRoomType;
  owner_id: number;
  roomUsers: IRoomUser[];
  type: TypeGame;
}

export interface ICreateRoom {
  pictures?: string;
  name: string;
  type: TypeGame;
}

export interface IRoomForUser {
  id: number;
  picture: string;
  status: string;
  name: string;
  owner_id: number;
  type: string;
  createdAt: string;
}

export interface IActiveUserRoom {
  point: number;
  room: IRoomForUser;
}
