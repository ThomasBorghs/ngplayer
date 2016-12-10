import {Routes, RouterModule} from '@angular/router';
import {AlbumDetailComponent} from "./library/album/detail/album.detail.component";
import {AlbumOverviewComponent} from "./library/album/overview/album.overview.component";
import {ArtistOverviewComponent} from "./library/artist/overview/artist.overview.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: AlbumOverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
