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
  }

  private static createAlbumFromRawData(albumData) {
    let albumArtistAndName:string[] = albumData.name.split(" - ");
    return new SimpleAlbum(albumData.uri, new SimpleArtist(albumArtistAndName[0]), albumArtistAndName[1]);
  }

  getAlbumDetails(directoryUri: string): any[] {
    return this.jsonRpcService.performCall(LIBRARY_BROWSE_METHOD, {'uri': directoryUri})
      .map((data: any) => data.result.map((reference) => reference.uri))
      .switchMap((uris: any[]) => this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': uris}))
      .map((data: any) => Object.keys(data.result).map((key) => data.result[key][0]).sort((n1,n2) => n1.track_no - n2.track_no))
      .map(trackDataList => trackDataList.map(trackData => new SimpleTrack(this.createArtists(trackData.artists), trackData.name, trackData.track_no, trackData.length, trackData.uri)));
  }

  private createArtists(artists: any[]) {
    return artists.map(artistData => new SimpleArtist(artistData.name));
  }

  getAllTracks() {
    return this.recursivelyRetrieveAllTrackReferences('local:directory')
      .reduce(LibraryService.collectAllTrackUris, [])
      .flatMap(trackReferencesList => this.retrieveTrackDetailList(trackReferencesList))
      .map(trackData => new DetailedTrack(this.createArtists(trackData.artists), trackData.name, trackData.track_no, trackData.length, trackData.uri, trackData.album ? trackData.album.name : null))
      .reduce(LibraryService.collectTracks, [])
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

  private static collectTracks(collector: DetailedTrack[], detailedTrack:DetailedTrack) {
    collector.push(detailedTrack);
    return collector;
  }

  private retrieveTrackDetailList(trackReferences: string[]) {
    return this.jsonRpcService.performCall(LIBRARY_LOOKUP_METHOD, {'uris': trackReferences})
      .flatMap(detailedTracksObject => Object.keys(detailedTracksObject.result).map(uriKey => detailedTracksObject.result[uriKey][0]));
  }
}

export class SimpleAlbum {

  private uri: string;
  private artist: SimpleArtist;
  private name: string;

  constructor(uri:string, artist: SimpleArtist, name: string) {
    this.uri = uri;
    this.artist = artist;
    this.name = name;
  }
}

export class SimpleArtist {

  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class SimpleTrack {

  private artists: SimpleArtist[];
  private name: string;
  private track_number: number;
  private uri: string;
  private length: number;

  constructor(artists: SimpleArtist[], name: string, track_number: number, length: number, uri: string) {
    this.artists = artists;
    this.name = name;
    this.track_number = track_number;
    this.length = length;
    this.uri = uri;
  }
}

export class DetailedTrack extends SimpleTrack {

  private albumName: string;

  constructor(artists: SimpleArtist[], name: string, track_number: number, length: number, uri: string, albumName:string) {
    super(artists, name, track_number, length, uri);
    this.albumName = albumName;
  }
}
