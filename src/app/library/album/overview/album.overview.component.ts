import {Component, OnInit} from "@angular/core";
import {LibraryService, Album} from "../../service/library.service";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: Album[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    this.libraryService.getAlbums().subscribe((albums) => this.albums = albums);
  }
}
