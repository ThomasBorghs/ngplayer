const speaker = require('speaker');

module.exports = Player;

function Player(PCMSource) {

  this.paused = true;
  this.PCMsource = PCMSource;

  this.createSpeaker = () => {
    return new speaker({
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100     // 44,100 Hz sample rate
    });
  };

  this.mySpeaker = this.createSpeaker();

  this.startPlayback = () => {
    this.PCMsource.pipe(this.mySpeaker);
    this.paused = false;
  };

  this.togglePause = () => {
    if (!this.paused) {
      this.mySpeaker.cork();
      this.paused = true;
    } else {
      this.mySpeaker.uncork();
      this.paused = false;
    }
  };
}
