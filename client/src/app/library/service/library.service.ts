import {Injectable} from "@angular/core";
import {Album, Track} from "../model/model";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

@Injectable()
export class LibraryService {

  private static LIBRARY_BASE_URL = () => 'http://localhost:3000/api/library/';
  private static ALBUMS_URL = () => LibraryService.LIBRARY_BASE_URL() + 'albums';
  private static TRACKS_URL = () => LibraryService.LIBRARY_BASE_URL() + 'tracks';
  private static ALBUM_TRACKS_URL = (albumUuid: string) => LibraryService.LIBRARY_BASE_URL() + 'albums/' + albumUuid + '/tracks';

  constructor(private http: Http) {
  }

  getAlbums(): Observable<Album[]> {
    return this.http
      .get(LibraryService.ALBUMS_URL())
      .map((response: Response) => response.json());
  }

  getAlbumTracks(albumUuid: string): Observable<Track[]> {
    return this.http
      .get(LibraryService.ALBUM_TRACKS_URL(albumUuid))
      .map((response: Response) => response.json());
  }

  getAllTracks(): Observable<Track[]> {
    return this.http
      .get(LibraryService.TRACKS_URL())
      .map((response: Response) => response.json());
  }
}
