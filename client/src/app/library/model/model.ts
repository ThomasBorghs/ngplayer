export interface Album {

  uuid: string;
  artist: string;
  title: string;
  tracksUuids: string[];

}

export function createAlbum(uuid, artist, title, trackUuids): Album {
  return {uuid: uuid, artist: artist, title: title, tracksUuids: trackUuids};
}

export interface Track {

  uuid: string;
  uri: string;
  artistNames: string[];
  title: string;
  album: string;
  duration: number;
  filename: string;
  trackNumber: number;

}

export function createTrack(uuid, uri, artistNames, title, album, duration, filename, trackNumber): Track {
  return {
    uuid: uuid,
    uri: uri,
    artistNames: artistNames,
    title: title,
    album: album,
    duration: duration,
    filename: filename,
    trackNumber: trackNumber
  }
}
