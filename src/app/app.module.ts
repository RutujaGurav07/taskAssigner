import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
// import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardComponent } from "./board/board.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "board", component: BoardComponent },
  { path: "profile", component: ProfileComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BoardComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

  ],
  exports: [
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
