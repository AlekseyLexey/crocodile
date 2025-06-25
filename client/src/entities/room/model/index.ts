import type { ITheme } from "@/features/Select";
import type { ROOM_STATUSES } from "@/shared";

export type StatusRoomType =
  | ROOM_STATUSES.PREPARE
  | ROOM_STATUSES.ACTIVE
  | ROOM_STATUSES.PAUSE
  | ROOM_STATUSES.END;

interface IProduct {
  id: number;
  category_id: number;
  price: number;
  name: string;
}

interface IAvatarData {
  Product: IProduct | null;
  user_id: number;
  product_id?: number;
  is_active?: boolean;
  id?: number;
}

export interface IRoomUser {
  id: number;
  username: string;
  point: number;
  UserRoom: IUserRoom;
  avatarData: IAvatarData;
}

export interface IUserRoom {
  point: number;
  is_lead: boolean;
  is_online: boolean;
}

export type TypeGame = "mono" | "multi";

export interface IRoom extends ICreateRoom {
  id: number;
  status: StatusRoomType;
  owner_id: number;
  roomUsers: IRoomUser[];
  type: TypeGame;
  roomThemes: ITheme[];
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
  roomThemes: ITheme[];
}

export interface IActiveUserRoom {
  point: number;
  room: IRoomForUser;
}
