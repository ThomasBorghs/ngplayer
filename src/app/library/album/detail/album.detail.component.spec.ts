/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
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
  let libraryServiceStub;
  let playbackServiceStub;
  let playbackQueueServiceStub;
  let activatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    libraryServiceStub = jasmine.createSpyObj('LibraryService', ['getAlbumTracks']);
    playbackServiceStub = jasmine.createSpyObj('PlaybackQeueueService', ['play']);
    playbackQueueServiceStub = jasmine.createSpyObj('PlaybackQueueService', ['clear', 'addTrack']);

    TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [MaterialModule],
      providers: [
        {provide: LibraryService, useValue: libraryServiceStub},
        {provide: PlaybackQueueService, useValue: playbackQueueServiceStub},
        {provide: PlaybackService, useValue: playbackServiceStub},
        {provide: ActivatedRoute, useValue: activatedRouteStub}]
    }).compileComponents();
  }));

  describe('component initialisation', () => {

    it('initialises the component correctly when a known URI was given', async(() => {
      activatedRouteStub.testQueryParams = {id: 1};
      libraryServiceStub.getAlbumTracks.and.returnValue(Observable.of([DEFAULT_TRACK]));

      fixture = TestBed.createComponent(AlbumDetailComponent);
      component = fixture.componentInstance;
      let de = fixture.debugElement.query(By.css('md-list'));
      let el = de.nativeElement;

      fixture.detectChanges();
      expect(el).toBeTruthy();
    }));
  });
});
