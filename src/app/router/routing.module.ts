import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {
    HomeComponent,
    AlbumComponent,
    PhotoComponent}  from './../home/home.component';
import { LostComponent }  from './../lost/lost.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'albums/:id', component: AlbumComponent, outlet: 'albumsRoute' },
      { path: 'photos', component: PhotoComponent, outlet: 'photosRoute' }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: LostComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
