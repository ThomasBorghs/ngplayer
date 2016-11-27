import {Component, OnInit} from "@angular/core";
import {JsonRpcService} from "../../services/jsonrpc.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/switchMap';

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  albumTracks: any[];

  constructor(private jsonRpcService:JsonRpcService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params:Params) => this.jsonRpcService.getData(LIBRARY_BROWSE_METHOD, {'uri': params['uri']}))
      .map((data:any) => data.result)
      .map((trackReferences:any[]) => trackReferences.map((reference) => reference.uri))
      .switchMap((uris:any[]) => this.jsonRpcService.getData(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data:any) => Object.keys(data.result).map((key) => data.result[key][0]))
      .do((x) => console.log(x))
      .subscribe((albumTracks) => this.albumTracks = albumTracks);

  }
}
