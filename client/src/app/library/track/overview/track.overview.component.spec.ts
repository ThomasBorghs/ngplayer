/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {MaterialModule} from "@angular/material";
import {Observable} from "rxjs";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {TrackOverviewComponent} from "./track.overview.component";
import {LibraryService} from "../../service/library.service";
import {Track} from "../../model/model";
import {TrackBuilder} from "../../../../testing/model_test_util";

describe('TrackOverviewComponent', () => {

  const TRACK_1_URI = "track 1 uri";
  const TRACK_1_ARTIST = "artistName 1";
  const TRACK_1_TITLE = "track 1 title";
  const TRACK_1_ALBUM = "track 1 album";

  const TRACK_2_ARTIST = "artistName 2";
  const TRACK_2_TITLE = "track 2 title";
  const TRACK_2_ALBUM = "track 2 album";

  const TRACK_1: Track = new TrackBuilder().withUri(TRACK_1_URI).withArtistNames([TRACK_1_ARTIST]).withTitle(TRACK_1_TITLE).withAlbum(TRACK_1_ALBUM).build();
  const TRACK_2: Track = new TrackBuilder().withArtistNames([TRACK_2_ARTIST]).withTitle(TRACK_2_TITLE).withAlbum(TRACK_2_ALBUM).build();

  let component: TrackOverviewComponent;
  let fixture: ComponentFixture<TrackOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackOverviewComponent],
      imports: [MaterialModule],
      providers: [{provide: LibraryService, useValue: jasmine.createSpyObj('LibraryService', ['getAllTracks'])},
                  {provide: PlaybackQueueService, useValue: jasmine.createSpyObj('PlaybackQueueService',['clear','addTrack'])},
                  {provide: PlaybackService, useValue: jasmine.createSpyObj('PlaybackService',['play'])}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOverviewComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('retrieves all tracks from the library service and displays them', fakeAsync(() => {
      createComponent();

      let tracks = fixture.debugElement.queryAll(By.css('span'));
      expect(tracks.length).toBe(2);
      expect(tracks[0].nativeElement.textContent).toEqual(TRACK_1_TITLE + ' - ' + TRACK_1_ARTIST + ' - ' + TRACK_1_ALBUM);
      expect(tracks[1].nativeElement.textContent).toEqual(TRACK_2_TITLE + ' - ' + TRACK_2_ARTIST + ' - ' + TRACK_2_ALBUM);
    }));
  });

  describe('trackClicked', () => {
    it('clears the play queue, adds the clicked track uri, and starts playback', fakeAsync(() => {
      createComponent();

      let firstTrack = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;
      firstTrack.click();

      expect(TestBed.get(PlaybackQueueService).clear).toHaveBeenCalled();
      expect(TestBed.get(PlaybackQueueService).addTrack).toHaveBeenCalledWith(TRACK_1_URI);
      expect(TestBed.get(PlaybackService).play).toHaveBeenCalled();
    }));
  });

  function createComponent() {
    TestBed.get(LibraryService).getAllTracks.and.returnValue(Observable.of([TRACK_1, TRACK_2]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }
});
