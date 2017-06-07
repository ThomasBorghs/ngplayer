/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed, async, fakeAsync, tick} from "@angular/core/testing";
import {AlbumDetailComponent} from "./album.detail.component";
import {MaterialModule} from "@angular/material";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {ActivatedRoute} from "@angular/router";
import {By} from "@angular/platform-browser";
import {ActivatedRouteStub} from "../../../../testing/activated.route.stub";
import {Observable} from "rxjs";
import {LibraryService} from "../../service/library.service";
import {createTrack, Track} from "../../model/model";

describe('AlbumDetailComponent', () => {

  const ARTIST_NAME_1 = "artistName 1";
  const ARTIST_NAME_2 = "artistName 2";

  const TRACK_1_URI = "track 1 uri";
  const TRACK_1: Track = createTrack("track 1 uuid", TRACK_1_URI, [ARTIST_NAME_1], "track 1 title", "track 1 album", 10, "track 1 filename", 1);
  const TRACK_2: Track = createTrack("track 2 uuid", "track 2 uri", [ARTIST_NAME_2], "track 2 title", "track 2 album", 20, "track 2 filename", 2);

  const EXPECTED_TRACK_1_INFO = '1. track name 1 10';
  const EXPECTED_TRACK_2_INFO = '2. track name 2 20';

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
  }

  describe('ngOnInit', () => {
    it('retrieves album tracks for given URI on initialisation', fakeAsync(() => {
      createDefaultComponent();

      let trackList = fixture.debugElement.queryAll(By.css('h3'));
      expect(trackList).toBeTruthy();
      expect(trackList.length).toEqual(2);
      expect(trackList[0].nativeElement.innerText).toEqual(EXPECTED_TRACK_1_INFO);
      expect(trackList[1].nativeElement.innerText).toEqual(EXPECTED_TRACK_2_INFO);

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
