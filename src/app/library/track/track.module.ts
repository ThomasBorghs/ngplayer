import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackOverviewComponent } from './overview/track.overview.component';
import {TrackRoutes} from "./track.route.module";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    TrackRoutes,
    MaterialModule
  ],
  declarations: [
    TrackOverviewComponent
  ]
})
export class TrackModule { }
