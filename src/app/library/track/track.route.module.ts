import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TrackOverviewComponent} from "./overview/track.overview.component";

const trackRoutes = [
  {
    path: 'tracks',
    component: TrackOverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(trackRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TrackRoutes {

}
