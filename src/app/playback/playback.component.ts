import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngp-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit {

  constructor() { }

  playPressed() {
    console.log("play");
  }

  pausePressed() {
    console.log("pause");
  }

  stopPressed() {
    console.log("stop");
  }

  ngOnInit() {
  }
}
