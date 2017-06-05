import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

export const PLAY_METHOD = 'core.playback.play';
export const PAUSE_METHOD = 'core.playback.pause';

@Injectable()
export class PlaybackService {

  private static PLAYBACK_BASE_URL = () => 'http://localhost:3000/api/player/';
  private static PLAY_URL = () => PlaybackService.PLAYBACK_BASE_URL() + 'play';
  private static PAUSE_URL = () => PlaybackService.PLAYBACK_BASE_URL() + 'pause';

  constructor(private http: Http) {
  }

  play(): void {
    this.http.put(PlaybackService.PLAY_URL(), {});
  }

  pause(): void {
    this.http.put(PlaybackService.PAUSE_URL(), {});
  }
}
