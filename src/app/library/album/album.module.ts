import {NgModule} from "@angular/core";
import {AlbumOverviewComponent} from "./overview/album.overview.component";
import {AlbumDetailComponent} from "./detail/album.detail.component";
import {AlbumRoutes} from "./album.route.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

@NgModule({
  declarations: [
    AlbumOverviewComponent,
    AlbumDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AlbumRoutes
  ]
})

export class AlbumModule {

}
