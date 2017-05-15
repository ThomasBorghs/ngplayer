const express = require('express');
const router = express.Router();
const ogg = require('ogg');
const lame = require('lame');
const fs = require('fs');
const flac = require('flac-bindings');
const Player = require('../player');

// mp3
// readStream.pipe(new lame.Decoder()).pipe(mySpeaker);

// ogg - not working
// readStream.pipe(new ogg.Decoder()).pipe(mySpeaker);

const PCMSource = fs.createReadStream('/Users/thomasborghs/muziek/test.flac').pipe(new flac.StreamDecoder());
const player = new Player(PCMSource);

router.get('/play', (req, res) => {
  player.startPlayback();
  res.send('playing test flac');
});

router.get('/pause', (req, res) => {
  player.togglePause();
  res.send('pausing test flac');
});

module.exports = router;
