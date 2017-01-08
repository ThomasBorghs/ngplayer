/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed, async, fakeAsync, tick} from "@angular/core/testing";
import {AlbumDetailComponent} from "./album.detail.component";
import {MaterialModule} from "@angular/material";
import {LibraryService} from "../../service/library.service";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SimpleTrack} from "../../model/simple.track";
import {SimpleArtist} from "../../model/simple.artist";
import {By} from "@angular/platform-browser";

describe('AlbumDetailComponent', () => {

  @Injectable()
  class ActivatedRouteStub {
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

  const DEFAULT_ARTIST = new SimpleArtist("artistName");
  const DEFAULT_TRACK = new SimpleTrack([DEFAULT_ARTIST], "trackname", 1, 1, "uri");

  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [MaterialModule],
      providers: [
        {provide: LibraryService, useValue: jasmine.createSpyObj('LibraryService', ['getAlbumTracks'])},
        {provide: PlaybackQueueService, useValue: jasmine.createSpyObj('PlaybackQeueueService', ['play'])},
        {provide: PlaybackService, useValue: jasmine.createSpyObj('PlaybackQueueService', ['clear', 'addTrack'])},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub()}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
  });

  describe('component initialisation', () => {

    it('initialises the component correctly when a known URI was given', fakeAsync(() => {
      TestBed.get(ActivatedRoute).testQueryParams = {id: 1};
      TestBed.get(LibraryService).getAlbumTracks.and.returnValue(Observable.of([DEFAULT_TRACK]));
      fixture.detectChanges();

      tick();
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('md-list-item'));
      let listElement = de.nativeElement;
      expect(listElement).toBeTruthy();

      // <md-list>
      // <md-list-item (click)="trackClicked(track.uri);" *ngFor="let track of albumTracks">
      // <p md-line>
      // <span class="demo-2">{{track.track_number}}. {{track.name}} {{track.length}}</span>
      // </p>
      // </md-list-item>
      // </md-list>
    });
  });
});
