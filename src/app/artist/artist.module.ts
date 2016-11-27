import {NgModule} from "@angular/core";
import {ArtistOverviewComponent} from "./overview/artist.overview.component";
import {ArtistRoutes} from "./artist.route.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ArtistOverviewComponent
  ],
  imports: [
    ArtistRoutes
  ]
})

export class ArtistModule {
}
