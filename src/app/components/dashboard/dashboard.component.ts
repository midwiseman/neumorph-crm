import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/client-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clientsLength: any;
  clientsLost: any;
  clientsActive: any;
  clientsSold: any;

  constructor(private clientService: ClientServiceService) {
    this.clientService.clientList$.subscribe(c => {
      this.clientsLength = c.length;
      let i = 0;
      const cl = [];
      const ca = [];
      const cs = [];
      c.forEach(client => {
        i++;
        if (i !== c.length) {
          if (client.disposition === 'Sold') {
            cs.push(client);
          } else {
            if (client.disposition === 'Active') {
              ca.push(client);
            } else { cl.push(client); }
          }
        }
      });
      this.clientsLost = cl;
      this.clientsActive = ca;
      this.clientsSold = cs;
      console.log(cl);
    });
  }

  ngOnInit(): void {
  }

}
