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
  maxItemsPerPage = 15;
  currentPage = [];
  selectedClient: any;

  constructor(private clientService: ClientServiceService) {

  }



  ngOnInit(): void {
    this.selectedClient = undefined;
    this.clientService.clientList$.subscribe(c => {
      this.clients = c;
      this.pageClients();
    });
  }

  // Rebuilds Client Pages after deletion, addition, or OnInit
  pageClients() {
    let clientsChunk = [];
    let clientCount = 1;
    this.clients.forEach(client => {
      clientCount++;
      clientsChunk.push(client);
      if (clientsChunk.length === this.maxItemsPerPage || clientCount === this.clients.length) {
        this.pagedClients.push(clientsChunk);
        clientsChunk = [];
      }
    });
    this.setCurrentPage(0);
  }

  setCurrentPage(pageNumber) {
    this.currentPage = this.pagedClients[`${pageNumber}`];
  }

  nextPage(pageNumber) {
    this.currentPage = (this.pagedClients[`${pageNumber + 1}`]);
  }

  previousPage(pageNumber) {
    this.currentPage = (this.pagedClients[`${pageNumber - 1}`]);
  }

  firstPage() {
    const firstPage = this.pagedClients[0];
    this.currentPage = firstPage;
  }

  lastPage() {
    const lastPage = this.pagedClients[`${this.pagedClients.length - 1}`];
    this.currentPage = lastPage;
  }

  searchClients(searchText) {
    if (searchText.length === 0) {
      this.refreshClients();
    } else {
      let clientsChunk = [];
      this.pagedClients = [];
      let clientCount = 1;
      this.clients.forEach(client => {
        clientCount++;
        // tslint:disable-next-line:forin
        for (const p in client) {
          if (typeof client[`${p}`] !== 'string') {
            for (const np in client[`${p}`]) {
              if (typeof client[`${p}`][`${np}`] !== 'string') {
                for (const nnp in client[`${p}`][`${np}`]) {
                  if (typeof client[`${p}`][`${np}`][`${nnp}`] === 'string') {
                    if (client[`${p}`][`${np}`][`${nnp}`].toLowerCase().includes(searchText.toLowerCase())) {
                      clientsChunk.push(client);
                    }
                  }
                }
              } else {
                if (client[`${p}`][`${np}`].toLowerCase().includes(searchText.toLowerCase())) {
                  clientsChunk.push(client);
                }
              }
            }
          } else {
            if (client[`${p}`].toLowerCase().includes(searchText.toLowerCase())) {
              clientsChunk.push(client);
            }
          }
          if (clientsChunk.length === this.maxItemsPerPage || clientCount === this.clients.length) {
            this.pagedClients.push(clientsChunk);
            clientsChunk = [];
          }
        }
      });
      this.setCurrentPage(0);
    }
  }

  refreshClients() {
    this.pagedClients = [];
    let clientsChunk = [];
    let clientCount = 1;
    this.clients.forEach(client => {
      clientCount++;
      clientsChunk.push(client);
      if (clientsChunk.length === this.maxItemsPerPage || clientCount === this.clients.length) {
        this.pagedClients.push(clientsChunk);
        clientsChunk = [];
      }
    });
    this.setCurrentPage(0);
  }

  setClient(client) {
    this.selectedClient = client;
  }

  createNewClient() {
    const newClient = { gender: 'unknown', name: 'unknown' };
    return newClient;
  }

  cancelEditClient() {
    this.selectedClient = undefined;
  }

  deleteClient(client) {
    const i = this.clients.indexOf(client);
    console.log(i);
    this.clients.splice(i, 1);
    this.selectedClient = undefined;
    this.pageClients();
  }

}
