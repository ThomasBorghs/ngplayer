import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import {PlaybackService} from "./service/playback.service";

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
    PlaybackService
  ]
})
export class PlaybackModule { }
