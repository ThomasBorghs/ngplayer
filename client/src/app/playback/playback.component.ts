import { Component, OnInit } from '@angular/core';
import {PlaybackService} from "./service/playback.service";

@Component({
  selector: 'ngp-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit {

  constructor(private playbackService: PlaybackService) { }

  playClicked(): void {
    this.playbackService.play();
  }

  pauseClicked(): void {
    this.playbackService.pause();
  }

  ngOnInit(): void {
  }
}
