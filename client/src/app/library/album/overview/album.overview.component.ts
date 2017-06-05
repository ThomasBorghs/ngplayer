import {Component, OnInit} from "@angular/core";
import {LibraryService} from "../../service/library.service";
import {Album} from "../../model/model";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: Album[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getAlbums()
      .do(x => console.log(x))
      .subscribe((albums) => this.albums = albums);
  }
}
