import {Component, OnInit} from "@angular/core";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {LibraryService} from "../../service/library.service";
import {Track} from "../../model/model";

@Component({
  selector: 'ngp-track',
  templateUrl: './track.overview.component.html'
})
export class TrackOverviewComponent implements OnInit {

  tracks: Track[];

  constructor(private libraryService: LibraryService,
              private playbackQueueService: PlaybackQueueService,
              private playbackService: PlaybackService) {
  }

  trackClicked(trackUri: string): void {
    this.playbackQueueService.clear();
    this.playbackQueueService.addTrack(trackUri);
    this.playbackService.play();
  }

  ngOnInit(): void {
    this.libraryService.getAllTracks()
      .do(x => console.log(x))
      .subscribe(trackList => this.tracks = trackList);
  }
}
