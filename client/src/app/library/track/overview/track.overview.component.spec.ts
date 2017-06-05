/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {MaterialModule} from "@angular/material";
import {LibraryService} from "../../service/mopidy.library.service";
import {Observable} from "rxjs";
import {DetailedTrack} from "../../model/detailed.track";
import {SimpleArtist} from "../../model/simple.artist";
import {PlaybackQueueService} from "../../../playback/service/playback.queue.service";
import {PlaybackService} from "../../../playback/service/playback.service";
import {TrackOverviewComponent} from "./track.overview.component";

describe('TrackOverviewComponent', () => {

  const SIMPLE_ARTIST_1 = new SimpleArtist("artist 1");
  const SIMPLE_ARTIST_2 = new SimpleArtist("artist 2");

  const TRACK_1_URI = "track 1 uri";
  const TRACK_1 = new DetailedTrack([SIMPLE_ARTIST_1], "track name 1", 1, 10, TRACK_1_URI, "album name 1");
  const TRACK_2 = new DetailedTrack([SIMPLE_ARTIST_2], "track name 2", 2, 20, "track 2 uri", "album name 2");

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
      expect(tracks[0].nativeElement.textContent).toEqual("track name 1 - artist 1 - album name 1 - 10");
      expect(tracks[1].nativeElement.textContent).toEqual("track name 2 - artist 2 - album name 2 - 20");
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
