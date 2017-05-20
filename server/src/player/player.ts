import * as Speaker from 'speaker';
import * as express from 'express';
import * as flac from 'flac-bindings';
import * as fs from 'fs';

export class Player {

  public router: express.Router;
  private paused: boolean;
  private PCMsource;
  private mySpeaker;

  constructor() {
    this.paused = true;
    // this.PCMsource = fs.createReadStream('/Users/thomasborghs/muziek/test.flac').pipe(new flac.StreamDecoder());
    this.mySpeaker = (() => {
      return new Speaker({
        channels: 2,          // 2 channels
        bitDepth: 16,         // 16-bit samples
        sampleRate: 44100     // 44,100 Hz sample rate
      });
    })();

    this.router = express.Router();
    this.router.get('/player/play', (req, res) => {
      this.startPlayback();
      res.send('playing test flac');
    });
    this.router.get('/player/pause', (req, res) => {
      this.togglePause();
      res.send('pausing test flac');
    });
  }

  private startPlayback = () => {
    this.PCMsource.pipe(this.mySpeaker);
    this.paused = false;
  };

  private togglePause = () => {
    if (!this.paused) {
      this.mySpeaker.cork();
      this.paused = true;
    } else {
      this.mySpeaker.uncork();
      this.paused = false;
    }
  };
}
