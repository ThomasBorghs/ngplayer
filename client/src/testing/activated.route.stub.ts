import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ActivatedRouteStub {

  private subject = new BehaviorSubject(this.testQueryParams);
  queryParams = this.subject.asObservable();

  private _testQueryParams;
  get testQueryParams() {
    return this._testQueryParams;
  }

  set testQueryParams(queryParams: {}) {
    this._testQueryParams = queryParams;
    this.subject.next(queryParams);
  }

}
