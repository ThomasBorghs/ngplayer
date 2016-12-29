import { Component, OnInit } from '@angular/core';
import {LibraryService, DetailedTrack} from "../../service/library.service";

@Component({
  selector: 'ngp-track',
  templateUrl: 'track.overview.component.html'
})
export class TrackOverviewComponent implements OnInit {

  tracks:DetailedTrack[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    this.libraryService.getAllTracks().subscribe(trackList => this.tracks = trackList);
  }
}
