import {NgModule} from "@angular/core";
import {ArtistOverviewComponent} from "./overview/artist.overview.component";
import {ArtistRoutes} from "./artist.route.module";

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
