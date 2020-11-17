import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  clientList$ = new BehaviorSubject([]);
  startingClientsNumber = 50;

  constructor(private http: HttpClient) {

    this.getStartingClientsFromRemote(this.startingClientsNumber);

  }


  getStartingClientsFromRemote(startingClientsNumber) {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('dataType', '/json');
    const clientGetter = this.http.get(`https://randomuser.me/api/?results=${this.startingClientsNumber}&nat=us&seed=69`
      ,
      {
        headers
      }
    );
    const clientArr = this.clientList$.getValue();
    clientGetter.toPromise().then(async clients => {
      await clients[`results`].forEach(client => {
        clientArr.push(client);
      });
      this.clientList$.next(clientArr);
    });
  }

}
