import {SimpleArtist} from "./simple.artist";
import {SimpleTrack} from "./simple.track";

export class DetailedTrack extends SimpleTrack {

  private albumName: string;

  constructor(artists: SimpleArtist[], name: string, track_number: number, length: number, uri: string, albumName:string) {
    super(artists, name, track_number, length, uri);
    this.albumName = albumName;
  }

  public static compare(track1:DetailedTrack, track2:DetailedTrack) {
    if (track1.albumName < track2.albumName) return -1;
    if (track1.albumName > track2.albumName) return 1;
    if (track1.track_number < track2. track_number) return -1;
    if (track1.track_number > track2. track_number) return 1;
    return 0;
  }
}
