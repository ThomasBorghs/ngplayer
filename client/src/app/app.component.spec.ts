/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MaterialModule} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {PlaybackModule} from "./playback/playback.module";
import {By} from "@angular/platform-browser";
import {Http} from "@angular/http";

describe('App: Ngplayer', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, MaterialModule, PlaybackModule],
      providers: [{provide: Http, useValue: jasmine.createSpyObj('Http', ['get'])}]
    }).compileComponents();
  }));

  it(`should show the app'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();

    expect(fixture.debugElement.query(By.css('#appTitle')).nativeElement.innerText).toEqual('NG Player');
    expect(fixture.debugElement.query(By.css('#albumsLink'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#artistsLink'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#tracksLink'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ngp-playback'))).toBeTruthy();
  }));

});
