const userRoomRouter = require('express').Router();
const UserRoomController = require('../../controllers/userRoomController');

//user-room
userRoomRouter.post('/', UserRoomController.createUserRoom);
userRoomRouter.patch('/point', UserRoomController.updateUserRoomPoint);
userRoomRouter.delete('/', UserRoomController.deleteUserRoom);

module.exports = userRoomRouter;
