import {Component, OnInit} from "@angular/core";
import {JsonRPCService} from "../../../services/jsonrpc/jsonrpc.service";

const BROWSE_LOCAL_LIBRARY_METHOD = 'core.library.browse'

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: any[];

  constructor(private jsonRpcService: JsonRPCService) {

  }

  ngOnInit() {
    this.jsonRpcService
      .performCall(BROWSE_LOCAL_LIBRARY_METHOD, {'uri': 'local:directory'})
      .subscribe((data) => this.albums = data.result);
  }
}
