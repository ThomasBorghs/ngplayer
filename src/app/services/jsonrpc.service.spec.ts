/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JsonRpcService } from './jsonrpc.service';

describe('Service: Jsonrpc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonRpcService]
    });
  });

  it('should ...', inject([JsonRpcService], (service: JsonRpcService) => {
    expect(service).toBeTruthy();
  }));
});
