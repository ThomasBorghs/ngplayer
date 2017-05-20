import { Injectable } from '@angular/core';
import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";

export const ADD_TRACK_TO_PLAYBACK_QUEUE_METHOD = 'core.tracklist.add';
export const CLEAR_PLAYBACK_QUEUE_METHOD = 'core.tracklist.clear';

@Injectable()
export class PlaybackQueueService {

  constructor(private jsonRPCService: JsonRPCService) { }

  addTrack(uri:String): void {
    this.jsonRPCService.performCall(ADD_TRACK_TO_PLAYBACK_QUEUE_METHOD, {uri: uri}).subscribe();
  }

  clear(): void {
    this.jsonRPCService.performCall(CLEAR_PLAYBACK_QUEUE_METHOD, {}).subscribe();
  }
}
