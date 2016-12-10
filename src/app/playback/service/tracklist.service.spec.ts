/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TracklistService } from './tracklist.service';

describe('TracklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TracklistService]
    });
  });

  it('should ...', inject([TracklistService], (service: TracklistService) => {
    expect(service).toBeTruthy();
  }));
});
