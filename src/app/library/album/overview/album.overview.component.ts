import {Component, OnInit} from "@angular/core";
import {JsonRPCService} from "../../../services/jsonrpc/jsonrpc.service";
import {LibraryService} from "../../service/library.service";

@Component({
  selector: 'ngp-album-overview',
  templateUrl: './album.overview.component.html'
})
export class AlbumOverviewComponent implements OnInit {

  albums: any[];
  allAlbums: any[];

  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    // this.libraryService.retrieveAlbumOverview().subscribe((data) => this.albums = data.result);
    this.libraryService.getAlbums();
  }
}
