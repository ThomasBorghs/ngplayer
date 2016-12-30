import {JsonRPCService} from "../../services/jsonrpc/jsonrpc.service";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/mergeAll";
import "rxjs/add/operator/reduce";
import "rxjs/Rx";
import {Observable} from "rxjs";
import {SimpleAlbum} from "../model/simple.album";
import {SimpleArtist} from "../model/simple.artist";
import {SimpleTrack} from "../model/simple.track";
import {DetailedTrack} from "../model/detailed.track";

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
      .map(trackArray => trackArray.sort(DetailedTrack.compare));
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
