import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import Library from "./library/library";
import Player from "./player/player";

class Application {

  public express: express.Application;

  private library: Library;
  private player: Player;

  constructor() {
    this.library = new Library();
    this.player = new Player();
    this.express = express();
    this.loadStatics();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    this.express.use('/app', router);
    this.express.use('/api', this.player.router);
    this.express.use('/api', this.library.router);
  }

  private loadStatics() {
    this.express.use(express.static(path.join(__dirname, '../../client/dist')));
  }
}

export default new Application().express;
