import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {TracklistService} from "../../../playback/service/tracklist.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {LibraryService} from "../../service/library.service";

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: any[];

  constructor(private libraryService: LibraryService,
              private tracklistService: TracklistService,
              private playbackService: PlaybackService,
              private activatedRoute: ActivatedRoute) {
  }

  trackClicked(trackUri: String) {
    this.tracklistService.clear();
    this.tracklistService.addTrack(trackUri);
    this.playbackService.play();
  }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.libraryService.retrieveAlbumDetails(params['uri']))
      .subscribe((albumTracks) => this.albumTracks = albumTracks);
  }
}
