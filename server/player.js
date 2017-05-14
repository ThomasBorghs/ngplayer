const speaker = require('speaker');

module.exports = Player;

function Player(PCMSource) {

  this.paused = true;
  this.PCMsource = PCMSource;

  this.createSpeaker = () => {
    const mySpeaker = new speaker({
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100     // 44,100 Hz sample rate
    });

    // close the speaker when unpiped
    mySpeaker.on('unpipe', () => {
      mySpeaker.close();
    });

    return mySpeaker
  };

  this.togglePause = () => {
    if (!this.paused) {
      this.stopPlayback();
    } else {
      this.resumePlayback();
    }
  };

  this.stopPlayback = () => {
    if (!this.paused) {
      this.PCMsource.unpipe();
      this.paused = true;
    }
  };

  this.resumePlayback = () => {
    if (this.paused) {
      this.PCMsource.pipe(this.createSpeaker());
      this.paused = false;
    }
  };
}
