import {Injectable} from "@angular/core";
import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";

export const PLAY_METHOD = 'core.playback.play';
export const PAUSE_METHOD = 'core.playback.pause';
export const STOP_METHOD = 'core.playback.stop';

@Injectable()
export class PlaybackService {

  constructor(private jsonRPCService:JsonRPCService) { }

  play(): void {
    this.performPlaybackCall(PLAY_METHOD);
  }

  pause(): void {
    this.performPlaybackCall(PAUSE_METHOD);
  }

  stop(): void {
    this.performPlaybackCall(STOP_METHOD);
  }

  private performPlaybackCall(playbackMethod: String): void {
    this.jsonRPCService.performCall(playbackMethod, {}).subscribe();
  }
}
