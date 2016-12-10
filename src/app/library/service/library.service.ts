import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";
import {Injectable} from "@angular/core";

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';
const BROWSE_LOCAL_LIBRARY_METHOD = 'core.library.browse'

@Injectable()
export class LibraryService {

  constructor(private jsonRpcService: JsonRPCService) {}

  retrieveAlbumDetails(directoryUri:String) :any[] {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': directoryUri})
      .map((data: any) => data.result.map((reference) => reference.uri))
      .switchMap((uris: any[]) => this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data: any) => Object.keys(data.result).map((key) => data.result[key][0]))
  }

  retrieveAlbumOverview() {
    return this.jsonRpcService.performCall(BROWSE_LOCAL_LIBRARY_METHOD, {'uri': 'local:directory'})
  }
}
