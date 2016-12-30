/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaybackQueueService } from './playback.queue.service';

describe('TracklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaybackQueueService]
    });
  });

  it('should ...', inject([PlaybackQueueService], (service: PlaybackQueueService) => {
    expect(service).toBeTruthy();
  }));
});
