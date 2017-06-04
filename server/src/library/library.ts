import * as express from 'express';
import * as walkDir from 'walkdir';
import * as musicMetadata from 'musicmetadata';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as parseFilepath from 'parse-filepath'

export default class Library {

  static FLAC_EXTENSION = '.flac';

  public router: express.Router;

  private albums: LocalAlbum[] = [];
  private tracks: LocalTrack[] = [];

  constructor() {
    this.loadLocalLibrary();

    this.router = express.Router().get('/library/albums', (req, res) => {
      res.send(this.albums);
    });

    this.router = express.Router().get('/library/tracks', (req, res) => {
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
      const newTrack = this.createTrack(musicMetadata, fileMetadata);
      this.addTrackToAlbum(newTrack);
      readStream.close();
    });
  }

  private createTrack(musicMetadata: any, fileMetadata: any): LocalTrack {
    const newTrack:LocalTrack = new LocalTrack(uuid(), fileMetadata.path, fileMetadata.base, musicMetadata.artist, musicMetadata.title, musicMetadata.album, musicMetadata.duration);
    this.tracks.push(newTrack);
    return newTrack;
  }

  private addTrackToAlbum(newTrack: LocalTrack) {
  }
}

class LocalAlbum {

  private uuid: string;
  private name: string;
  private artistNames: string[];

  constructor(uuid: string, name: string, artistNames: string[]) {
    this.uuid = uuid;
    this.name = name;
    this.artistNames = artistNames;
  }
}

class LocalTrack {

  private uuid: string;
  private uri: string;
  private artistNames: string[];
  private title: string;
  private album: string;
  private duration: number;
  private filename: string;

  constructor(uuid: string, uri: string, filename: string, artistNames: string[], title: string, album: string, duration: number) {
    this.uuid = uuid;
    this.uri = uri;
    this.filename = filename;
    this.artistNames = artistNames;
    this.title = title;
    this.album = album;
    this.duration = duration;
  }
}
