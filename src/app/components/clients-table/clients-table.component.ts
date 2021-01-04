import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  clientNameForm: FormGroup;
  clientGenderForm: FormGroup;
  clientLocationForm: FormGroup;

  constructor(private clientService: ClientServiceService, private fb: FormBuilder) {
    this.selectedClient = undefined;
    this.clientService.clientList$.subscribe(c => {
      this.clients = c;
      this.pageClients();
    });
  }



  ngOnInit(): void {
  }

  buildForms() {
    const name = this.selectedClient.name;
    this.clientNameForm = this.fb.group({
      first: [name ? name.first : ''],
      last: [name ? name.last : ''],
    });
    console.log(this.clientNameForm.value);
  }

  // Rebuilds Client Pages after deletion, addition, or OnInit
  pageClients() {
    this.pagedClients = [];
    let clientsChunk = [];
    let clientCount = 1;
    console.log(this.clients);
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
    this.buildForms();
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
    this.clients.splice(i, 1);
    this.selectedClient = undefined;
    this.pageClients();
  }

  addClient(client) {
    this.clients.splice(0, 0, client);
    this.selectedClient = undefined;
    this.pageClients();
  }

}
