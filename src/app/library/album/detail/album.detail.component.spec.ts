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

  const ARTIST_1 = new SimpleArtist("artistName 1");
  const ARTIST_2 = new SimpleArtist("artistName 2");

  const TRACK_1 = new SimpleTrack([ARTIST_1], "trackname 1", 1, 10, "uri 1");
  const TRACK_2 = new SimpleTrack([ARTIST_2], "trackname 2", 2, 20, "uri 2");

  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [MaterialModule],
      providers: [
        {provide: LibraryService, useValue: jasmine.createSpyObj('LibraryService', ['getSortedAlbumTracks'])},
        {provide: PlaybackQueueService, useValue: jasmine.createSpyObj('PlaybackQeueueService', ['play'])},
        {provide: PlaybackService, useValue: jasmine.createSpyObj('PlaybackQueueService', ['clear', 'addTrack'])},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub()}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
  });

  it('retrieves album tracks for given URI on initialisation', fakeAsync(() => {
    TestBed.get(ActivatedRoute).testQueryParams = {uri: 'album directory uri'};
    TestBed.get(LibraryService).getSortedAlbumTracks.and.returnValue(Observable.of([TRACK_1, TRACK_2]));
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    let trackListElement = fixture.debugElement.query(By.css('md-list'));
    expect(trackListElement).toBeTruthy();
    expect(trackListElement.children.length).toEqual(2);

    expect(trackListElement.children[0].nativeElement.innerText).toEqual('1. trackname 1 10');
    expect(trackListElement.children[1].nativeElement.innerText).toEqual('2. trackname 2 20');

    expect(TestBed.get(LibraryService).getSortedAlbumTracks).toHaveBeenCalledWith('album directory uri');
  });

});
