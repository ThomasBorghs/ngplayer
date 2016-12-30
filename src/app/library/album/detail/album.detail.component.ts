import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {LibraryService} from "../../service/library.service";

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: any[];

  constructor(private libraryService: LibraryService,
              private tracklistService: PlaybackQueueService,
              private playbackService: PlaybackService,
              private activatedRoute: ActivatedRoute) {
  }

  trackClicked(trackUri: String) {
    this.tracklistService.clear();
    this.tracklistService.addTrack(trackUri);
    this.playbackService.play();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .switchMap((queryParams: Params) => this.libraryService.getAlbumDetails(queryParams['uri']))
      .do(x => console.log(x))
      .subscribe((albumTracks) => this.albumTracks = albumTracks);
  }
}
