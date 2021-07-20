import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})
export class ProfileServiceService {
   private username:string;



  constructor(private http:HttpClient) {
    console.log("Service is ready ")
    this.username='Google';
    

   }
   getProfileRepos(){
     interface ApiResponse{
      login:string;
    
     }
     let result:[];

     return this.http.get(`https://api.github.com/users/`+this.username+`/repos`).pipe(map(res =>res));
   }
   updateProfile(username: string) {
    this.username = username;
  }
}
