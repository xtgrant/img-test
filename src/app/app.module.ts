import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {
    HomeComponent,
    AlbumComponent,
    PhotoComponent } from './home/home.component';
import { LostComponent } from './lost/lost.component';
import { AppRoutingModule } from './router/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    PhotoComponent,
    LostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
