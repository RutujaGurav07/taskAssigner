import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path :"profile" ,component:ProfileComponent}
];

@NgModule({
  declarations: [ ProfileComponent ],
  imports: [
    RouterModule.forRoot(routes)],  
    exports: [RouterModule]

})
export class AppRoutingModule { }
