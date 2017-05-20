const express = require('express');
const router = express.Router();
const Library = require('./library');

const library = new Library();

router.get('/library/albums', (req, res) => {
  res.send(library.albums);
});

module.exports = router;
