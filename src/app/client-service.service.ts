import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  clientList$ = new BehaviorSubject([]);
  startingClientsNumber = 1;

  constructor(private http: HttpClient) {

    for (let i = 0; i < this.startingClientsNumber; i++) {
      const headers = new HttpHeaders()
        .set('Cache-Control', 'no-cache')
        .set('Host', '*');
      const clientGetter = this.http.get(`https://api.namefake.com/random/united-states`
        ,
        {
          headers
        }
      );
      const clientArr = this.clientList$.getValue();
      clientGetter.toPromise().then(async client => {
        clientArr.push(await client);
        this.clientList$.next(clientArr);
      });
    }
  }

}
