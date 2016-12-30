import {Component, OnInit} from "@angular/core";
import {LibraryService} from "../../service/library.service";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {DetailedTrack} from "../../model/detailed.track";

@Component({
  selector: 'ngp-track',
  templateUrl: 'track.overview.component.html'
})
export class TrackOverviewComponent implements OnInit {

  tracks: DetailedTrack[];

  constructor(private libraryService: LibraryService,
              private tracklistService:PlaybackQueueService,
              private playbackService:PlaybackService) {
  }

  trackClicked(trackUri: String) {
    this.tracklistService.clear();
    this.tracklistService.addTrack(trackUri);
    this.playbackService.play();
  }

  ngOnInit() {
    this.libraryService.getAllTracks().subscribe(trackList => this.tracks = trackList);
  }
}
