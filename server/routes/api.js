const express = require('express');
const router = express.Router();
const speaker = require('speaker');
const ogg = require('ogg');
const lame = require('lame');
const fs = require('fs');
const flac = require('flac-bindings');

router.get('/', (req, res) => {
  const readStream = fs.createReadStream('/Users/thomasborghs/muziek/test.flac');

  const mySpeaker = new speaker({
    channels: 2,          // 2 channels
    bitDepth: 16,         // 16-bit samples
    sampleRate: 44100     // 44,100 Hz sample rate
  });

  // mp3
  // readStream.pipe(new lame.Decoder()).pipe(mySpeaker);

  // ogg - not working
  // readStream.pipe(new ogg.Decoder()).pipe(mySpeaker);

  // flac
  readStream.pipe(new flac.StreamDecoder()).pipe(mySpeaker);

  res.send('api works - playing test flac');
});

module.exports = router;
