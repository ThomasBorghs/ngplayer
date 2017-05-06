/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {PAUSE_METHOD, PLAY_METHOD, PlaybackService, STOP_METHOD} from './playback.service';
import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";
import {Observable} from "rxjs";

describe('PlaybackService', () => {

  let jsonRPCServiceStub: JsonRPCService;
  let playbackService: PlaybackService;

  beforeEach(() => {
    jsonRPCServiceStub = jasmine.createSpyObj('JsonRPCService', ['performCall']);
    jsonRPCServiceStub.performCall.and.returnValue(Observable.empty());
    playbackService = new PlaybackService(jsonRPCServiceStub);
  });

  describe('play', () => {
    it('calls the JsonRPCService to start playback', () => {
      playbackService.play();

      expect(jsonRPCServiceStub.performCall).toHaveBeenCalledWith(PLAY_METHOD, {});
    });
  });

  describe('pause', () => {
    it('calls the JsonRPCService to pause playback', () => {
      playbackService.pause();

      expect(jsonRPCServiceStub.performCall).toHaveBeenCalledWith(PAUSE_METHOD, {});
    });
  });

  describe('stop', () => {
    it('calls the JsonRPCService to stop playback', () => {
      playbackService.stop();

      expect(jsonRPCServiceStub.performCall).toHaveBeenCalledWith(STOP_METHOD, {});
    });
  });

});
