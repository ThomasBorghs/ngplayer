import {SimpleArtist} from "./simple.artist";

export class SimpleTrack {

  protected artists: SimpleArtist[];
  protected name: string;
  protected track_number: number;
  protected uri: string;
  protected length: number;

  constructor(artists: SimpleArtist[], name: string, track_number: number, length: number, uri: string) {
    this.artists = artists;
    this.name = name;
    this.track_number = track_number;
    this.length = length;
    this.uri = uri;
  }
}
