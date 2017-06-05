import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.route.module";
import {AlbumModule} from "./library/album/album.module";
import {ArtistModule} from "./library/artist/artist.module";
import {PlaybackModule} from "./playback/playback.module";
import {LibraryService} from "./library/service/library.service";
import {TrackModule} from "./library/track/track.module";

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
    TrackModule,
    PlaybackModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    LibraryService
  ]
})

export class AppModule {
}
