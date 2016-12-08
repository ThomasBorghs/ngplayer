import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {JsonRpcService} from "./services/jsonrpc.service";
import {AppRoutingModule} from "./app.route.module";
import {AlbumModule} from "./album/album.module";
import {ArtistModule} from "./artist/artist.module";
import {NavigationModule} from "./navigation/navigation.module";
import {PlaybackModule} from "./playback/playback.module";

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
    ArtistModule,
    NavigationModule,
    PlaybackModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    JsonRpcService
  ]
})

export class AppModule { }
