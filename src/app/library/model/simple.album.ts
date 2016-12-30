import {SimpleArtist} from "./simple.artist";

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
