import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {JsonRPCService} from "../../../services/jsonrpc/jsonrpc.service";
import {TracklistService} from "../../../playback/service/tracklist.service";
import {PlaybackService} from "../../../playback/service/playback.service";

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: any[];

  constructor(private jsonRpcService:JsonRPCService,
              private tracklistService:TracklistService,
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
      .switchMap((params:Params) => this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': params['uri']}))
      .map((data:any) => data.result)
      .map((trackReferences:any[]) => trackReferences.map((reference) => reference.uri))
      .switchMap((uris:any[]) => this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data:any) => Object.keys(data.result).map((key) => data.result[key][0]))
      .subscribe((albumTracks) => this.albumTracks = albumTracks);
  }
}
