import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlaybackComponent
  ],
  exports: [
    PlaybackComponent
  ]
})
export class PlaybackModule { }
