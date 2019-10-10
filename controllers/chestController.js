/* eslint-disable consistent-return */

const Chest = require('../models/chest');

// Get chest object
function getChests(req, res) {
  // Finds all chests in the database
  Chest.find({}, (err, chests) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!chests) return res.status(404).send({ message: 'No chests found' });

    return res.status(200).send(chests);
  });
}

// Get chest object by ID
function getChest(req, res) {
  const { chestId } = req.params;

  if (!chestId) return res.status(400).send({ message: 'Missing params' });

  // Finds the chest with the id provided
  Chest.findById({ _id: chestId }, (err, chest) => {
    if (err) return res.status(404).send({ message: `No chests found: ${err}` });

    return res.status(200).send(chest);
  });
}

// Create and save a new chest
function createChest(req, res) {
  const { design } = req.body;
  const { img } = req.body;
  const { youtuber } = req.body;
  const { owner } = req.body;

  if (!design || !img || !youtuber || !owner) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Checks if the chest already exist
  Chest.findOne({ email }, (err1, chestExist) => {
    if (err1) return res.status(500).send({ message: `Error finding chest ${err1}` });
    if (chestExist) return res.status(409).send({ message: 'Chest already exist' });

    // Create a new chest
    const chest = new Chest({
      design,
      img,
      youtuber,
      owner,
    });

    // Save the new chest
    chest.save((err2, newChest) => {
      if (err2) return res.status(500).send({ message: `Error saving chest ${err2}` });
      if (!newChest) return res.status(500).send({ message: 'No chest to save' });

      return res.status(200).send({ message: 'Chest saved', newChest });
    });
  });
}

// Replace the chest information
function replaceChest(req, res) {
  const { design } = req.params;
  const { img } = req.body;
  const { youtuber } = req.body;
  const { owner } = req.body;

  if (!design || !img || !youtuber || !owner) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create the new chest
  const chestReplace = {
    design,
    img,
    youtuber,
    owner,
  };

  Chest.findById(chestId, (err1, chest) => {
    if (err1) return res.status(404).send({ message: `No chest found: ${err1}` });

    // Replaces the chest
    chest.replaceOne(chestReplace, (err2) => {
      if (err2) return res.status(500).send({ message: `Error replacing chest ${err2}` });

      return res.status(200).send({ message: 'Chest replaced' });
    });
  });
}

// Update the chest information
function editChest(req, res) {
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

  // Update the chest
  Chest.findByIdAndUpdate(chestId, updatedFields, (err) => {
    if (err) return res.status(500).send({ message: `Error finding chest ${err}` });

    return res.status(200).send({ message: 'Chest updated' });
  });
}

// Deletes the chest from the database
function deleteChest(req, res) {
  const { chestId } = req.params;

  if (!chestId) return res.status(400).send({ message: 'Missing params' });

  Chest.findByIdAndRemove(chestId, (err, chest) => {
    if (err) return res.status(500).send({ message: `Error erasing chest ${err}` });
    if (!chest) return res.status(404).send({ message: 'Chest not found' });

    return res.status(200).send({ message: 'Chest deleted' });
  });
}


module.exports = {
  getChests,
  getChest,
  createChest,
  replaceChest,
  editChest,
  deleteChest,
};
