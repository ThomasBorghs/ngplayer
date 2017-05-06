import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaybackComponent} from './playback.component';
import {PlaybackService} from "./service/playback.service";
import {PlaybackQueueService} from "./service/playback.queue.service";

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
    PlaybackQueueService
  ]
})

export class PlaybackModule {
}
