import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AlbumOverviewComponent} from "./overview/album.overview.component";
import {AlbumDetailComponent} from "./detail/album.detail.component";

const albumRoutes = [
  {
    path: 'albums',
    component: AlbumOverviewComponent
  },
  {
    path: 'albumDetail',
    component: AlbumDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(albumRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AlbumRoutes {

}
