import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from "@angular/material";

import { AppComponent } from './app.component';
import { AlbumOverviewComponent } from './album/overview/album.overview.component';
import {JsonRpcService} from "./services/jsonrpc.service";
import { AlbumDetailComponent } from './album/detail/album.detail.component';
import {RouterModule} from "@angular/router";
import {routes, AppRoutingModule} from "./app.route.module";
import { ArtistOverviewComponent } from './artist/overview/artist.overview.component';
import {AlbumModule} from "./album/album.module";
import {ArtistModule} from "./artist/artist.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    AlbumModule,
    ArtistModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    JsonRpcService
  ]
})

export class AppModule { }
