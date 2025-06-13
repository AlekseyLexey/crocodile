export type StatusRoomType = "prepare" | "active" | "pause" | "end";

export interface IRoomUser {
  id: number;
  username: string;
  point: number;
  UserRoom: IUserRoom;
}

export interface IUserRoom {
  point: number;
}

export interface IRoom {
  id: number;
  pictures: string;
  status: StatusRoomType;
  name: string;
  owner_id: number;
  roomUsers: IRoomUser[];
}
