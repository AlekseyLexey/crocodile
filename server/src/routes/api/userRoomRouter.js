const userRoomRouter = require('express').Router();
const UserRoomController = require('../../controllers/userRoomController');

//user-room
userRoomRouter.get('/', UserRoomController.findUserRoomByUserId);
userRoomRouter.post('/', UserRoomController.createUserRoom);
userRoomRouter.patch('/point', UserRoomController.updateUserRoomPoint);
userRoomRouter.delete('/', UserRoomController.deleteUserRoom);
userRoomRouter.get('/finished', UserRoomController.getEndedUserRooms);
userRoomRouter.get('/active', UserRoomController.getActiveUserRooms);

module.exports = userRoomRouter;
