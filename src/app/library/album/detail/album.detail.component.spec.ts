/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed, async, fakeAsync, tick} from "@angular/core/testing";
import {AlbumDetailComponent} from "./album.detail.component";
import {MaterialModule} from "@angular/material";
import {LibraryService} from "../../service/library.service";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {ActivatedRoute} from "@angular/router";
import {SimpleTrack} from "../../model/simple.track";
import {SimpleArtist} from "../../model/simple.artist";
import {By} from "@angular/platform-browser";
import {ActivatedRouteStub} from "../../../../testing/activated.route.stub";
import {Observable} from "rxjs";

describe('AlbumDetailComponent', () => {

  const ARTIST_1 = new SimpleArtist("artistName 1");
  const ARTIST_2 = new SimpleArtist("artistName 2");

  const TRACK_1_URI = "uri 1";
  const TRACK_1 = new SimpleTrack([ARTIST_1], "trackname 1", 1, 10, TRACK_1_URI);
  const TRACK_2 = new SimpleTrack([ARTIST_2], "trackname 2", 2, 20, "uri 2");

  const EXPECTED_TRACK_1_INFO = '1. trackname 1 10';
  const EXPECTED_TRACK_2_INFO = '2. trackname 2 20';

  const ALBUM_DIRECTORY_URI = 'album directory uri';

  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [MaterialModule],
      providers: [
        {provide: LibraryService, useValue: jasmine.createSpyObj('LibraryService', ['getSortedAlbumTracks'])},
        {provide: PlaybackService, useValue: jasmine.createSpyObj('PlaybackService', ['play'])},
        {provide: PlaybackQueueService, useValue: jasmine.createSpyObj('PlaybackQueueService', ['clear', 'addTrack'])},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub()}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
  });

  function createDefaultComponent() {
    TestBed.get(ActivatedRoute).testQueryParams = {uri: ALBUM_DIRECTORY_URI};
    TestBed.get(LibraryService).getSortedAlbumTracks.and.returnValue(Observable.of([TRACK_1, TRACK_2]));
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
  };

  describe('ngOnInit', () => {
    it('retrieves album tracks for given URI on initialisation', fakeAsync(() => {
      createDefaultComponent();

      let trackListElement = fixture.debugElement.query(By.css('md-list'));
      expect(trackListElement).toBeTruthy();
      expect(trackListElement.children.length).toEqual(2);

      expect(trackListElement.children[0].nativeElement.innerText).toEqual(EXPECTED_TRACK_1_INFO);
      expect(trackListElement.children[1].nativeElement.innerText).toEqual(EXPECTED_TRACK_2_INFO);

      expect(TestBed.get(LibraryService).getSortedAlbumTracks).toHaveBeenCalledWith(ALBUM_DIRECTORY_URI);
    }));
  });

  describe('trackClicked', () => {
    it('clears the current playback queue, adds the clicked track to it and starts playback of the queue', fakeAsync(() => {
      createDefaultComponent();

      fixture.debugElement.query(By.css('md-list')).children[0].triggerEventHandler('click', null);

      expect(TestBed.get(PlaybackQueueService).clear).toHaveBeenCalled();
      expect(TestBed.get(PlaybackQueueService).addTrack).toHaveBeenCalledWith(TRACK_1_URI);
      expect(TestBed.get(PlaybackService).play).toHaveBeenCalled();
    }));
  });
});
