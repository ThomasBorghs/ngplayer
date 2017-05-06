/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ADD_TRACK_TO_PLAYBACK_QUEUE_METHOD, CLEAR_PLAYBACK_QUEUE_METHOD, PlaybackQueueService} from './playback.queue.service';
import {Observable} from "rxjs";

describe('PlaybackQueueService', () => {

  const TRACK_URI = 'track uri';

  let jsonRPCServiceStub;
  let playbackQueueService: PlaybackQueueService;

  beforeEach(() => {
    jsonRPCServiceStub = jasmine.createSpyObj('JsonRPCService', ['performCall']);
    jsonRPCServiceStub.performCall.and.returnValue(Observable.empty());
    playbackQueueService = new PlaybackQueueService(jsonRPCServiceStub);
  });

  describe('addTrack', () => {
    it('calls the jsonRPCService to add a track to the playback queue', () => {
      playbackQueueService.addTrack(TRACK_URI);

      expect(jsonRPCServiceStub.performCall).toHaveBeenCalledWith(ADD_TRACK_TO_PLAYBACK_QUEUE_METHOD, {uri: TRACK_URI});
    });
  });

  describe('clear', () => {
    it('calls the jsonRPCService to clear the playback queue', () => {
      playbackQueueService.clear();

      expect(jsonRPCServiceStub.performCall).toHaveBeenCalledWith(CLEAR_PLAYBACK_QUEUE_METHOD, {});
    });
  });
});
