import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/client-service.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  clients: any;
  pageStart: 1;
  pagedClients = [];
  maxItemsPerPage = 20;

  constructor(private clientService: ClientServiceService) {

  }

  ngOnInit(): void {
    this.clientService.clientList$.subscribe(c => {
      console.log(c);
      this.clients = c;
      let clientArr = [];
      c.forEach(client => {
        this.clients.splice(this.clients.indexOf(client), 1);
      });
    });
  }

}
