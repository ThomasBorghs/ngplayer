import * as uuid from 'uuid';
import {Album, Track} from "../app/library/model/model";

export class TrackBuilder {

  uuid: string = uuid();
  uri: string = 'track uri';
  artistNames: string[] = ['artist name'];
  title: string = 'track title';
  album: string = 'track album';
  duration: number = 100;
  filename: string = 'track filename';
  trackNumber: number = 1;

  withUuid(uuid: string): TrackBuilder {
    this.uuid = uuid;
    return this;
  }

  withUri(uri: string): TrackBuilder {
    this.uri = uri;
    return this;
  }

  withArtistNames(artistNames: [string]): TrackBuilder {
    this.artistNames = artistNames;
    return this;
  }

  withTitle(title: string): TrackBuilder {
    this.title = title;
    return this;
  }

  withAlbum(album: string): TrackBuilder {
    this.album = album;
    return this;
  }

  withDuration(duration: number): TrackBuilder {
    this.duration = duration;
    return this;
  }

  withFilename(filename: string): TrackBuilder {
    this.filename = filename;
    return this;
  }

  withTrackNumber(trackNumber: number): TrackBuilder {
    this.trackNumber = trackNumber;
    return this;
  }

  build(): Track {
    return {
      uuid: this.uuid,
      uri: this.uri,
      artistNames: this.artistNames,
      title: this.title,
      album: this.album,
      duration: this.duration,
      filename: this.filename,
      trackNumber: this.trackNumber
    }
  }
}

export class AlbumBuilder {

  uuid: string = uuid();
  artist: string = 'album artist';
  title: string = 'album title';
  trackUuids: string[] = [uuid(), uuid()];

  withUuid(uuid: string): AlbumBuilder {
    this.uuid = uuid;
    return this;
  }

  withArtist(artist: string): AlbumBuilder {
    this.artist = artist;
    return this;
  }

  withTitle(title: string): AlbumBuilder {
    this.title = title;
    return this;
  }

  withTrackUuids(trackUuids: string[]): AlbumBuilder {
    this.trackUuids = trackUuids;
    return this;
  }

  build(): Album {
    return {uuid: this.uuid, artist: this.artist, title: this.title, trackUuids: this.trackUuids};
  }
}

