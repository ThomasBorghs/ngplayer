import {Routes, RouterModule} from '@angular/router';
import {AlbumOverviewComponent} from "./library/album/overview/album.overview.component";
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
