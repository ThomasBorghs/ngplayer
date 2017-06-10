/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {PlaybackComponent} from './playback.component';
import {PlaybackService} from "./service/playback.service";

describe('PlaybackComponent', () => {
  let component: PlaybackComponent;
  let fixture: ComponentFixture<PlaybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaybackComponent],
      providers: [{provide: PlaybackService, useValue: jasmine.createSpyObj('PlaybackService', ['play', 'pause'])}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('playClicked', () => {
    it('starts playback when play was clicked', () => {
      let button = fixture.debugElement.query(By.css('#play'));
      button.nativeElement.click();

      expect(TestBed.get(PlaybackService).play).toHaveBeenCalled();
    });
  });

  describe('pauseClicked', () => {
    it('pauses playback when pause was clicked', () => {
      let button = fixture.debugElement.query(By.css('#pause'));
      button.nativeElement.click();

      expect(TestBed.get(PlaybackService).pause).toHaveBeenCalled();
    });
  });
});
