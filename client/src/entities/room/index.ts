export type {
  StatusRoomType,
  IRoomUser,
  IUserRoom,
  IRoom,
  ICreateRoom,
} from "./model";
export { setRoom, roomReducer } from "./slice/RoomSlice";
export {
  createRoomThunk,
  getAllRoomThunk,
  getByIdRoomThunk,
} from "./api/RoomApi";
