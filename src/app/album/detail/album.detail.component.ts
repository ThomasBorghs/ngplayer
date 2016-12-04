import {Component, OnInit} from "@angular/core";
import {JsonRpcService} from "../../services/jsonrpc.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/switchMap';

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';
const TRACKLIST_CLEAR_METHOD = 'core.tracklist.clear';
const TRACKLIST_ADD_METHOD = 'core.tracklist.add';
const PLAYBACK_PLAY_METHOD = 'core.playback.play';

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: any[];

  constructor(private jsonRpcService:JsonRpcService,
              private activatedRoute: ActivatedRoute) {
  }

  playTrack(uri:String) {
    this.jsonRpcService.performCall(TRACKLIST_CLEAR_METHOD, {})
      .switchMap(() => this.jsonRpcService.performCall(TRACKLIST_ADD_METHOD, {'uri': uri}))
      .switchMap(() => this.jsonRpcService.performCall(PLAYBACK_PLAY_METHOD, {}))
      .subscribe();
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
