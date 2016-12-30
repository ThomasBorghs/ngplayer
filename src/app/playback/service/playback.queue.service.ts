import { Injectable } from '@angular/core';
import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";

const ADD_TRACK_TO_TRACKLIST_METHOD = 'core.tracklist.add';
const CLEAR_TRACKLIST_METHOD = 'core.tracklist.clear';

@Injectable()
export class PlaybackQueueService {

  constructor(private jsonRPCService: JsonRPCService) { }

  addTrack(uri:String) {
    this.jsonRPCService.performCall(ADD_TRACK_TO_TRACKLIST_METHOD, {uri: uri}).subscribe();
  }

  clear() {
    this.jsonRPCService.performCall(CLEAR_TRACKLIST_METHOD, {}).subscribe();
  }
}
