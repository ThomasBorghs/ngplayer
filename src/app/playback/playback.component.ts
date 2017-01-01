import { Component, OnInit } from '@angular/core';
import {PlaybackService} from "./service/playback.service";

@Component({
  selector: 'ngp-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit {

  constructor(private playbackService: PlaybackService) { }

  playPressed(): void {
    this.playbackService.play();
  }

  pausePressed(): void {
    this.playbackService.pause();
  }

  stopPressed() {
    this.playbackService.stop();
  }

  ngOnInit(): void {
  }
}
