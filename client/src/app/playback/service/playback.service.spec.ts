/* tslint:disable:no-unused-variable */

import {Observable} from "rxjs";
import {PlaybackService} from "./playback.service";

describe('PlaybackService', () => {

  let http;
  let playbackService: PlaybackService;

  beforeEach(() => {
    http = jasmine.createSpyObj('Http', ['put']);
    http.put.and.returnValue(Observable.empty());
    playbackService = new PlaybackService(http);
  });

  describe('play', () => {
    it('performs a REST call to start playback', () => {
      playbackService.play();

      expect(http.put).toHaveBeenCalledWith(PlaybackService.PLAY_URL(), {});
    });
  });

  describe('pause', () => {
    it('performs a REST call to pause playback', () => {
      playbackService.pause();

      expect(http.put).toHaveBeenCalledWith(PlaybackService.PAUSE_URL(), {});
    });
  });
});
