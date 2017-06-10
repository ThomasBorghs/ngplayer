import * as express from 'express';
import * as walkDir from 'walkdir';
import * as musicMetadata from 'musicmetadata';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as parseFilepath from 'parse-filepath'
import * as Debug from 'debug';

const debug = Debug('library');

export default class Library {

  static FLAC_EXTENSION = '.flac';

  public router: express.Router;

  private albums: LocalAlbum[] = [];
  private tracks: LocalTrack[] = [];

  constructor() {
    this.loadLocalLibrary();

    this.router = express.Router();
    this.router.get('/library/albums', (req, res) => {
      res.send(this.albums);
    });

    this.router.get('/library/albums/:albumUuid/tracks', (req, res) => {
      const trackUuids: string[] = this.albums.find((album) => album.uuid === req.params.albumUuid).trackUuids;
      res.send(this.tracks.filter((track) => trackUuids.indexOf(track.uuid) > -1).sort((track1, track2) => track1.trackNumber - track2.trackNumber));
    });

    this.router.get('/library/tracks', (req, res) => {
      res.send(this.tracks);
    });
  }

  private loadLocalLibrary() {
    this.loadFiles();
  }

  private loadFiles() {
    // todo parameterize
    const emitter = walkDir('/Users/thomasborghs/muziek/flac');

    emitter.on('file', (filepath) => {
      const fileMetadata = parseFilepath(filepath);
      if (fileMetadata.ext === Library.FLAC_EXTENSION) {
        this.processFlacFile(fileMetadata);
      }
    });
  }

  private processFlacFile(fileMetadata) {
    const readStream = fs.createReadStream(fileMetadata.path);
    musicMetadata(readStream, (err, musicMetadata) => {
      let newTrack = this.createTrack(musicMetadata, fileMetadata);
      this.addToAlbum(fileMetadata, newTrack.uuid);
      readStream.close();
    });
  }

  private createTrack(musicMetadata: any, fileMetadata: any) : LocalTrack {
    const newTrack: LocalTrack = new LocalTrack(uuid(), fileMetadata.path, fileMetadata.base, musicMetadata.artist, musicMetadata.title, musicMetadata.album, musicMetadata.duration, musicMetadata.track.no);
    this.tracks.push(newTrack);
    debug('new track added: ' + newTrack.toString());
    return newTrack;
  }

  private addToAlbum(fileMetadata: any, newTrackUuid: string) {
    const stringArray: string[] = fileMetadata.dir.split('/');
    if (stringArray[stringArray.length - 2] === 'albums') {
      let albumArtistAndTitle: string[] = stringArray[stringArray.length - 1].split(' - ');
      this.addToExistingAlbumOrCreateOneAndAdd(albumArtistAndTitle[0], albumArtistAndTitle[1], newTrackUuid);
    }
  }

  private addToExistingAlbumOrCreateOneAndAdd(artist: string, title: string, newTrackUuid: string) {
    let album:LocalAlbum = this.albums.find((album) => album.artist === artist && album.title === title);
    if (!album) {
      album = new LocalAlbum(uuid(), artist, title);
      this.albums.push(album);
      debug('new album created: ' + artist + ' - ' + title);
    }
    album.addTrack(newTrackUuid);
  }
}

class LocalAlbum {

  uuid: string;
  artist: string;
  title: string;
  trackUuids: string[] = [];

  constructor(uuid: string, artist: string, title: string) {
    this.uuid = uuid;
    this.artist = artist;
    this.title = title;
  }

  public addTrack(trackUuid): void {
    this.trackUuids.push(trackUuid);
  }
}

class LocalTrack {

  uuid: string;
  uri: string;
  artistNames: string[];
  title: string;
  album: string;
  duration: number;
  filename: string;
  trackNumber: number;

  constructor(uuid: string, uri: string, filename: string, artistNames: string[], title: string, album: string, duration: number, trackNumber: number) {
    this.uuid = uuid;
    this.uri = uri;
    this.filename = filename;
    this.artistNames = artistNames;
    this.title = title;
    this.album = album;
    this.duration = duration;
    this.trackNumber = trackNumber;
  }

  public toString(): string {
    return this.artistNames.reduce((accumulator, artist) => accumulator + artist + ' ', '') + '- ' + this.title;
  }
}
