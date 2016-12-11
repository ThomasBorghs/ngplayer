import {Component, OnInit} from "@angular/core";
import {JsonRPCService} from "../../../services/jsonrpc/jsonrpc.service";
import {LibraryService, Album} from "../../service/library.service";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: Album[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    this.libraryService.getAlbums().subscribe((albumsResult) => this.albums = albumsResult);
  }
}
