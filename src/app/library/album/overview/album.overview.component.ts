import {Component, OnInit} from "@angular/core";
import {LibraryService} from "../../service/library.service";
import {SimpleAlbum} from "../../model/simple.album";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: SimpleAlbum[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getAlbums()
      .do(x => console.log(x))
      .subscribe((albums) => this.albums = albums);
  }
}
