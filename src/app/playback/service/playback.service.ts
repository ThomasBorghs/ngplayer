import {Injectable} from "@angular/core";
import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";

const PLAY_METHOD = 'core.playback.play';
const PAUSE_METHOD = 'core.playback.pause';
const STOP_METHOD = 'core.playback.stop';

@Injectable()
export class PlaybackService {

  constructor(private jsonRPCService:JsonRPCService) { }

  play() {
    this.performPlaybackCall(PLAY_METHOD);
  }

  pause() {
    this.performPlaybackCall(PAUSE_METHOD);
  }

  stop() {
    this.performPlaybackCall(STOP_METHOD);
  }

  private performPlaybackCall(playbackMethod: String) {
    this.jsonRPCService.performCall(playbackMethod, {}).subscribe();
  }
}
