const roomRouter = require('express').Router();
const RoomController = require('../../controllers/roomController');
const authMiddleware = require('../../middlewares/authMiddleware');
const validateId = require('../../middlewares/validateIdMiddleware');

//rooms
roomRouter.get('/', RoomController.getAllRooms);
roomRouter.get('/:id', validateId, RoomController.getRoomById);
roomRouter.post('/', RoomController.createRoom);
roomRouter.put('/:id', validateId, RoomController.updateRoom);

module.exports = roomRouter;
