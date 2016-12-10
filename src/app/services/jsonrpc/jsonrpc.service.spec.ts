/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JsonRPCService } from './jsonrpc.service';

describe('Service: Jsonrpc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonRPCService]
    });
  });

  it('should ...', inject([JsonRPCService], (service: JsonRPCService) => {
    expect(service).toBeTruthy();
  }));
});
