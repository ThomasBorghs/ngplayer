/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaybackService } from './playback.service';

describe('PlaybackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaybackService]
    });
  });

  it('should ...', inject([PlaybackService], (service: PlaybackService) => {
    expect(service).toBeTruthy();
  }));
});
