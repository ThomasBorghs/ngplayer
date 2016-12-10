import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {JsonRPCService} from "./services/jsonrpc/jsonrpc.service";
import {AppRoutingModule} from "./app.route.module";
import {AlbumModule} from "./library/album/album.module";
import {ArtistModule} from "./library/artist/artist.module";
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
    PlaybackModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    JsonRPCService
  ]
})

export class AppModule {
}
