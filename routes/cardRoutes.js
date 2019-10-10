const express = require('express');
const cardController = require('../controllers/cardController');

const api = express.Router();

// Method and end of url needed to access each controller
api.get('/', cardController.getCards);
api.get('/:cardId', cardController.getCard);
api.post('/', cardController.createCard);
api.put('/:cardId', cardController.replaceCard);
api.patch('/:cardId', cardController.editCard);
api.delete('/:cardId', cardController.deleteCard);

module.exports = api;
