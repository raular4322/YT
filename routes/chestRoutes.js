const express = require('express');
const chestController = require('../controllers/chestController');

const api = express.Router();

// Method and end of url needed to access each controller
api.get('/', chestController.getChests);
api.get('/:chestId', chestController.getChest);
api.post('/', chestController.createChest);
api.put('/:chestId', chestController.replaceChest);
api.patch('/:chestId', chestController.editChest);
api.delete('/:chestId', chestController.deleteChest);

module.exports = api;
