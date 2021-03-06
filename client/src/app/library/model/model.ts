export interface Album {

  uuid: string;
  artist: string;
  title: string;
  trackUuids: string[];

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
