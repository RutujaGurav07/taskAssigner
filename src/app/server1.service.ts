import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Server1Service {

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  
  getEvents() {
     return this.request('GET', `${environment.serverUrl}/event`);
  }
  createEvent(newEvent) {
    return this.request('POST', `${environment.serverUrl}/event`,newEvent );
  }
  
  updateEvent(event) {
    console.log("createEvent function",event);

    return this.request('PUT', `${environment.serverUrl}/event/${event.status}`, event);
  }

}
