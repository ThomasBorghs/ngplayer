import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/reduce'
import 'rxjs/Rx';
import {Observable} from "rxjs";

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';

@Injectable()
export class LibraryService {

  constructor(private jsonRpcService: JsonRPCService) {
  }

  getAlbums() {
    return this.retrieveTrackDetails()
      .reduce(LibraryService.retrieveAlbums, [])
      .subscribe((x) => console.log(x));
  }

  private retrieveTrackDetails() {
    return this.recursivelyRetrieveAllTrackReferences('local:directory')
      .reduce(LibraryService.collectAllTrackUris, [])
      .flatMap(trackReferencesList => this.retrieveTrackDetailList(trackReferencesList));
  }

  private recursivelyRetrieveAllTrackReferences(uri:string) {
    if (uri.startsWith('local:directory')) {
      return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': uri})
        .flatMap((data:any) => data.result)
        .flatMap(directory => this.recursivelyRetrieveAllTrackReferences(directory.uri));
    } else {
      return Observable.of(uri);
    }
  }

  private static collectAllTrackUris(collector:string[], uri) {
    return collector.concat(uri);
  }

  private retrieveTrackDetailList(trackReferences:string[]) {
    return this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': trackReferences})
      .flatMap(detailedTracksObject => Object.keys(detailedTracksObject.result).map(uriKey => detailedTracksObject.result[uriKey][0]));
  }

  private static retrieveAlbums(collector:Album[], track) {
    if (LibraryService.hasAlbum(track) && LibraryService.doesNotContainAlbumYet(collector, track.album.name)) {
      collector.push(new Album(track.album.name, track.album.date, track.album.num_tracks));
    }
    return collector;
  }

  private static hasAlbum(track):boolean {
    return track.album;
  }

  private static doesNotContainAlbumYet(albumList:Album[], albumName:String) {
    return albumList.every(album => album.name !== albumName);
  }

  private static albumsAreSame(album1:Album, album2:Album):boolean {
    return album1.name === album2.name;
  }

  retrieveAlbumDetails(directoryUri: string): any[] {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': directoryUri})
      .map((data: any) => data.result.map((reference) => reference.uri))
      .switchMap((uris: any[]) => this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data: any) => Object.keys(data.result).map((key) => data.result[key][0]))
  }

  retrieveAlbumOverview() {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': 'local:directory'})
  }
}

export class Album {

  name: string;
  year: number;
  numberOfTracks: number;

  constructor(name: string, year: number, numberOfTracks: number) {
    this.name = name;
    this.year = year;
    this.numberOfTracks = numberOfTracks;
  }
}

export interface Artist {
  name: string
}

export interface Track {

}
