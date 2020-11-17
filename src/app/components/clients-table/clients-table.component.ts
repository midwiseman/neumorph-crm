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
  maxItemsPerPage = 10;
  currentPage = [];

  constructor(private clientService: ClientServiceService) {

  }

  ngOnInit(): void {
    this.clientService.clientList$.subscribe(c => {
      console.log(c);
      this.clients = c;
      let clientsChunk = [];
      let clientCount = 1;
      this.clients.forEach(client => {
        clientCount++;
        const clientIndex = this.clients.indexOf(client);
        clientsChunk.push(client);
        if (clientsChunk.length === this.maxItemsPerPage || clientCount === this.clients.length) {
          this.pagedClients.push(clientsChunk);
          clientsChunk = [];
        }
      });
      this.setCurrentPage(0);
      console.log(this.currentPage);
    });
  }

  setCurrentPage(pageNumber) {
    this.currentPage = this.pagedClients[`${pageNumber}`];
    return this.currentPage;
  }

  nextPage(pageNumber) {
    this.currentPage = (this.pagedClients[`${pageNumber + 1}`]);
    return this.currentPage;
  }

  previousPage(pageNumber) {
    this.currentPage = (this.pagedClients[`${pageNumber - 1}`]);
    return this.currentPage;
  }

}
