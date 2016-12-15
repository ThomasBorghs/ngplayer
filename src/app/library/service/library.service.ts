import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/mergeAll";
import "rxjs/add/operator/reduce";
import "rxjs/Rx";
import {Observable} from "rxjs";

const LIBRARY_BROWSE_METHOD = 'core.library.browse';
const LIBRARY_LOOKUP_METHOD = 'core.library.lookup';

@Injectable()
export class LibraryService {

  constructor(private jsonRpcService: JsonRPCService) {
  }

  getAlbums() {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': 'local:directory:albums'})
      .map(data => data.result.map(LibraryService.createAlbumFromRawData))
      .do(x => console.log(x))
  }

  private static createAlbumFromRawData(albumData) {
    let albumArtistAndName:string[] = albumData.name.split(" - ");
    return new Album(albumData.uri, new Artist(albumArtistAndName[0]), albumArtistAndName[1]);
  }

  getAlbumDetails(directoryUri: string): any[] {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': directoryUri})
      .map((data: any) => data.result.map((reference) => reference.uri))
      .switchMap((uris: any[]) => this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data: any) => Object.keys(data.result).map((key) => data.result[key][0]))
  }

  getAllTrackReferences() {
    return this.recursivelyRetrieveAllTrackReferences('local:directory')
      .reduce(LibraryService.collectAllTrackUris, [])
      .flatMap(trackReferencesList => this.retrieveTrackDetailList(trackReferencesList));
  }

  private recursivelyRetrieveAllTrackReferences(uri: string) {
    if (uri.startsWith('local:directory')) {
      return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': uri})
        .flatMap((data: any) => data.result)
        .flatMap(directory => this.recursivelyRetrieveAllTrackReferences(directory.uri));
    } else {
      return Observable.of(uri);
    }
  }

  private static collectAllTrackUris(collector: string[], uri) {
    return collector.concat(uri);
  }

  private retrieveTrackDetailList(trackReferences: string[]) {
    return this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': trackReferences})
      .flatMap(detailedTracksObject => Object.keys(detailedTracksObject.result).map(uriKey => detailedTracksObject.result[uriKey][0]));
  }

  private static getAlbumFromCollection(albumList: Album[], albumName: string):Album {
    for(let i=0; i<albumList.length; i++) {
      if (albumList[i].name == albumName) {
        return albumList[i];
      }
    }
    return null;
  }
}

export class Album {

  uri: string;
  artist: Artist;
  name: string;

  constructor(uri:string, artist: Artist, name: string) {
    this.uri = uri;
    this.artist = artist;
    this.name = name;
  }
}

export class Artist {

  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Track {

  artists: Artist[];
  name: string;
  track_number: number;
  uri: string;

  constructor(artists: Artist[], name: string, track_number: number, uri: string) {
    this.artists = artists;
    this.name = name;
    this.track_number = track_number;
    this.uri = uri;
  }
}
