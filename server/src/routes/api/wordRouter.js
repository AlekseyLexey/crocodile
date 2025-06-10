const wordRouter = require('express').Router();
const WordController = require('../../controllers/wordController');
const validateId = require('../../middlewares/validateIdMiddleware');

//words
wordRouter.get('/', WordController.getAllWords);
wordRouter.get('/:id', validateId, WordController.getWordById);

module.exports = wordRouter;
