import * as express from 'express';

export class Library {

  public albums: string[];
  public router: express.Router;

  constructor() {
    this.albums = ['album1', 'album2'];
    this.router = express.Router().get('/library/albums', (req, res) => {
        res.send(this.albums);
    });
  }
}
