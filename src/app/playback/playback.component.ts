import { Component, OnInit } from '@angular/core';
import {PlaybackService} from "./service/playback.service";

@Component({
  selector: 'ngp-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit {

  constructor(private playbackService: PlaybackService) { }

  playPressed() {
    this.playbackService.play();
  }

  pausePressed() {
    this.playbackService.pause();
  }

  stopPressed() {
    this.playbackService.stop();
  }

  ngOnInit() {
  }
}
