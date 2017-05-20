import {BACKEND_URL, JsonRPCService} from './jsonrpc.service';
import {Http, Response, ResponseOptions} from "@angular/http";
import {Observable} from "rxjs";

describe('JsonRPCService', () => {

  const METHOD = 'method';
  const REQUEST_PARAM_1 = 'request param1';
  const REQUEST_PARAM_2 = 'request param2';

  const RESPONSE_PARAM = 'response param';
  const JSON_REPONSE = {responseParam: RESPONSE_PARAM};

  let httpStub;
  let jsonRPCService: JsonRPCService;

  beforeEach(() => {
    httpStub = jasmine.createSpyObj('Http', ['post']);
    jsonRPCService = new JsonRPCService(httpStub);
  });

  describe('performCall', () => {
    it('posts method call and parameters to backend URL', () => {
      httpStub.post.and.returnValue(Observable.of(buildResponse()));

      jsonRPCService.performCall(METHOD, {param1: REQUEST_PARAM_1, param2: REQUEST_PARAM_2}).subscribe((data) => this.result = data);

      expect(httpStub.post).toHaveBeenCalledWith(BACKEND_URL, {
        "jsonrpc": "2.0",
        "id": 1,
        "method": METHOD,
        params: {
          param1: REQUEST_PARAM_1,
          param2: REQUEST_PARAM_2
        }
      });
      expect(this.result).toEqual(jasmine.objectContaining(JSON_REPONSE));
    });
  });

  function buildResponse() {
    let responseOptions = new ResponseOptions({
      body: JSON_REPONSE
    });
    return new Response(responseOptions);
  }
});
