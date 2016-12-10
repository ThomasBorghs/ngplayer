import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import {PlaybackService} from "./service/playback.service";
import {TracklistService} from "./service/tracklist.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlaybackComponent
  ],
  exports: [
    PlaybackComponent
  ],
  providers: [
    PlaybackService,
    TracklistService
  ]
})
export class PlaybackModule { }
