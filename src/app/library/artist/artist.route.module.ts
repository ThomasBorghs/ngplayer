import {NgModule} from "@angular/core";
import {ArtistOverviewComponent} from "./overview/artist.overview.component";
import {RouterModule} from "@angular/router";

const artistRoutes = [
  {
    path: 'artists',
    component: ArtistOverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(artistRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ArtistRoutes {

}
