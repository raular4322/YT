/* eslint-disable consistent-return */

const Card = require('../models/card');

// Get card object
function getCards(req, res) {
  // Finds all chests in the database
  Card.find({}, (err, cards) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!cards) return res.status(404).send({ message: 'No cards found' });

    return res.status(200).send(cards);
  });
}

// Get card object by ID
function getCard(req, res) {
  const { cardId } = req.params;

  if (!cardId) return res.status(400).send({ message: 'Missing params' });

  // Finds the card with the id provided
  Card.findById({ _id: cardId }, (err, card) => {
    if (err) return res.status(404).send({ message: `No cards found: ${err}` });

    return res.status(200).send(card);
  });
}

// Create and save a new card
function createCard(req, res) {
  const { design } = req.body;
  const { img } = req.body;
  const { youtuber } = req.body;
  const { owner } = req.body;

  if (!design || !img || !youtuber || !owner) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Checks if the card already exist
  Card.findOne({ email }, (err1, cardExist) => {
    if (err1) return res.status(500).send({ message: `Error finding card ${err1}` });
    if (cardExist) return res.status(409).send({ message: 'Card already exist' });

    // Create a new card
    const card = new Card({
      design,
      img,
      youtuber,
      owner,
    });

    // Save the new card
    card.save((err2, newCard) => {
      if (err2) return res.status(500).send({ message: `Error saving card ${err2}` });
      if (!newCard) return res.status(500).send({ message: 'No card to save' });

      return res.status(200).send({ message: 'Card saved', newCard });
    });
  });
}

// Replace the card information
function replaceCard(req, res) {
  const { design } = req.params;
  const { img } = req.body;
  const { youtuber } = req.body;
  const { owner } = req.body;

  if (!design || !img || !youtuber || !owner) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create the new card
  const cardReplace = {
    design,
    img,
    youtuber,
    owner,
  };

  Card.findById(cardId, (err1, card) => {
    if (err1) return res.status(404).send({ message: `No card found: ${err1}` });

    // Replaces the card
    card.replaceOne(cardReplace, (err2) => {
      if (err2) return res.status(500).send({ message: `Error replacing card ${err2}` });

      return res.status(200).send({ message: 'Card replaced' });
    });
  });
}

// Update the card information
function editCard(req, res) {
  const updatedFields = {};

  const { design } = req.params;
  const { img } = req.body;
  const { youtuber } = req.body;
  const { owner } = req.body;

  // Get the new information
  if (design) updatedFields.email = req.body.design;
  if (img) updatedFields.password = req.body.img;
  if (youtuber) updatedFields.firstname = req.body.youtuber;
  if (owner) updatedFields.surname = req.body.owner;

  // Update the card
  Card.findByIdAndUpdate(cardId, updatedFields, (err) => {
    if (err) return res.status(500).send({ message: `Error finding card ${err}` });

    return res.status(200).send({ message: 'Card updated' });
  });
}

// Deletes the card from the database
function deleteCard(req, res) {
  const { cardId } = req.params;

  if (!cardId) return res.status(400).send({ message: 'Missing params' });

  Card.findByIdAndRemove(cardId, (err, card) => {
    if (err) return res.status(500).send({ message: `Error erasing card ${err}` });
    if (!card) return res.status(404).send({ message: 'Card not found' });

    return res.status(200).send({ message: 'Card deleted' });
  });
}


module.exports = {
  getCards,
  getCard,
  createCard,
  replaceCard,
  editCard,
  deleteCard,
};
