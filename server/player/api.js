const express = require('express');
const router = express.Router();
const fs = require('fs');
const flac = require('flac-bindings');
const Player = require('./player');

const PCMSource = fs.createReadStream('/Users/thomasborghs/muziek/test.flac').pipe(new flac.StreamDecoder());
const player = new Player(PCMSource);

router.get('/player/play', (req, res) => {
  player.startPlayback();
  res.send('playing test flac');
});

router.get('/player/pause', (req, res) => {
  player.togglePause();
  res.send('pausing test flac');
});

module.exports = router;
