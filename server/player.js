const speaker = require('speaker');

module.exports = Player;

function Player(PCMSource) {

  this.paused = false;
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
      this.paused = true;
    } else {
      this.resumePlayback();
    }
  };

  this.stopPlayback = () => {
    this.PCMsource.unpipe();
  };

  this.resumePlayback = () => {
    this.PCMsource.pipe(this.createSpeaker());
  };
}
