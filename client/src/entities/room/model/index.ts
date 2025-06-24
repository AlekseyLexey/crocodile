import type { ROOM_STATUSES } from '@/shared';

export type StatusRoomType =
  | ROOM_STATUSES.PREPARE
  | ROOM_STATUSES.ACTIVE
  | ROOM_STATUSES.PAUSE
  | ROOM_STATUSES.END;

interface IBuy {
  id: number;
  is_active: boolean;
  product_id: number;
  user_id: number;
}

interface IUserProducts {
  Buy: IBuy;
  category_id: number;
  id: number;
  name: string;
  price: number;
}

export interface IRoomUser {
  id: number;
  username: string;
  point: number;
  UserRoom: IUserRoom;
  userProducts: IUserProducts[];
}

export interface IUserRoom {
  point: number;
  is_lead: boolean;
  is_online: boolean;
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
