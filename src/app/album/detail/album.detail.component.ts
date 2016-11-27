import {Component, OnInit} from "@angular/core";
import {JsonRpcService} from "../../services/jsonrpc.service";

const BROWSE_LOCAL_LIBRARY_METHOD = 'core.library.browse'

@Component({
  selector: 'ngp-album',
  templateUrl: './album.detail.component.html'
})
export class AlbumDetailComponent implements OnInit {

  constructor(private jsonRpcService:JsonRpcService) {
  }

  ngOnInit() {
    this.jsonRpcService.
      getData(BROWSE_LOCAL_LIBRARY_METHOD, {'uri': 'local:directory'})
  }

}
