import {Component, OnInit} from "@angular/core";
import {JsonRpcService} from "../../services/jsonrpc.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/switchMap';

const BROWSE_LOCAL_LIBRARY_METHOD = 'core.library.browse'

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
      .switchMap((params: Params) => this.retrieveAlbumDetails(params['uri']))
      .map((data:any) => data.result)
      .subscribe((albumTracks: any[]) => this.albumTracks = albumTracks);
  }

  private retrieveAlbumDetails(uri:String): Observable<any> {
    return this.jsonRpcService.getData(BROWSE_LOCAL_LIBRARY_METHOD, {'uri': uri});
  }
}
