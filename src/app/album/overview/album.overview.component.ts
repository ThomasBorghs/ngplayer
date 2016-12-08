import {Component, OnInit, Input} from "@angular/core";
import {JsonRpcService} from "../../services/jsonrpc.service";

const BROWSE_LOCAL_LIBRARY_METHOD = 'core.library.browse'

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: any[];

  constructor(private jsonRpcService:JsonRpcService) {

  }

  ngOnInit() {
    this.jsonRpcService
      .performCall(BROWSE_LOCAL_LIBRARY_METHOD, {'uri': 'local:directory'})
      .subscribe((data) => this.albums = data.result);
  }
}
