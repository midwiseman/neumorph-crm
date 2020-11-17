import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  clientList$ = new BehaviorSubject([]);
  startingClientsNumber = 250;

  constructor(private http: HttpClient, private jsonp: HttpClientJsonpModule) {

    this.getStartingClientsFromRemote(this.startingClientsNumber, 1);

  }


  getStartingClientsFromRemote(startingClientsNumber, pageNo) {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('dataType', '/json');
    const urlString = `https://randomuser.me/api/?callback=JSONP_CALLBACK&results=${this.startingClientsNumber}&nat=us&seed=69&${pageNo}`;
    this.http.jsonp(urlString, 'JSONP_CALLBACK').toPromise().then(r => {
      this.clientList$.next(r[`results`]);
    });
  }

}
