import {Component, OnInit} from "@angular/core";
import {LibraryService, SimpleAlbum} from "../../service/library.service";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: SimpleAlbum[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    this.libraryService.getAlbums()
      .do(x => console.log(x))
      .subscribe((albums) => this.albums = albums);
  }
}
