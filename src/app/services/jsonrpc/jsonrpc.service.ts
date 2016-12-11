import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

let BACKEND_URL = 'http://localhost:6680/mopidy/rpc';

@Injectable()
export class JsonRPCService {

  constructor(private http: Http) {
  }

  performCall(method: String, params: any): any {
    let body = JsonRPCService.createBody(method, params);
    // console.log(body)
    return this.http.post(BACKEND_URL, body)
      .map((response: Response) => response.json())
      // .do((x) => console.log(x));
  }

  private static createBody(method: String, params: any): any {
    return {
      "jsonrpc": "2.0",
      "id": 1,
      "method": method,
      params
    }
  }
}
