import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {LibraryService} from "../../service/library.service";
import {SimpleTrack} from "../../model/simple.track";

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: SimpleTrack[];

  constructor(private libraryService: LibraryService,
              private playbackQueueService: PlaybackQueueService,
              private playbackService: PlaybackService,
              private activatedRoute: ActivatedRoute) {
  }

  trackClicked(trackUri: String): void {
    this.playbackQueueService.clear();
    this.playbackQueueService.addTrack(trackUri);
    this.playbackService.play();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .switchMap((queryParams: Params) => this.libraryService.getAlbumTracks(queryParams['uri']))
      .do(x => console.log(x))
      .subscribe((albumTracks) => this.albumTracks = albumTracks);
  }
}
