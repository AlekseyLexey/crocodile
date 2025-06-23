const pictureRouter = require("express").Router();

const RoomService = require("../../services/roomService");
const { formatResponse } = require("../../utils/formatResponse");

pictureRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await RoomService.updateRoomById(id, data);

    return res.status(204).json(formatResponse(204, "Сохраненно"));
  } catch (error) {
    next(error);
  }
});

pictureRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await RoomService.findRoomById(id);
    return res
      .status(200)
      .json(formatResponse(200, "Загруженно", data.pictures));
  } catch (error) {
    next(error);
  }
});

module.exports = pictureRouter;
