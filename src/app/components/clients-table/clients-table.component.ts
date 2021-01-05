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
  clientLocationForm: FormGroup;
  clientDispositionForm: FormGroup;
  pendingChanges: object = { name: {}, location: {}, disposition: '' };
  hasPendingChanges: boolean;

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
    const location = this.selectedClient.location;
    const dis = this.selectedClient.disposition;
    this.clientNameForm = this.fb.group({
      first: [name ? name.first : ''],
      last: [name ? name.last : ''],
    });
    this.clientLocationForm = this.fb.group({
      city: [location ? location.city : ''],
      state: [location ? location.state : '']
    });
    this.clientDispositionForm = this.fb.group({
      disposition: [dis ? dis : '']
    });
    console.log(this.clientDispositionForm);
    this.clientNameForm.controls.first.valueChanges.subscribe(changes => {
      this.hasPendingChanges = true;
      this.pendingChanges[`name`][`first`] = changes;
    });
    this.clientNameForm.controls.last.valueChanges.subscribe(changes => {
      this.hasPendingChanges = true;
      this.pendingChanges[`name`][`last`] = changes;
    });
    this.clientLocationForm.controls.city.valueChanges.subscribe(changes => {
      this.hasPendingChanges = true;
      this.pendingChanges[`location`][`city`] = changes;
    });
    this.clientLocationForm.controls.state.valueChanges.subscribe(changes => {
      this.hasPendingChanges = true;
      this.pendingChanges[`location`][`state`] = changes;
    });
    this.clientDispositionForm.valueChanges.subscribe(changes => {
      this.hasPendingChanges = true;
      this.pendingChanges[`disposition`] = changes[`disposition`];
    });
    console.log(this.clientLocationForm.controls);
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
    const newClient = {};
    return newClient;
  }

  cancelEditClient() {
    this.pendingChanges = { name: {}, location: {}, disposition: '' };
    this.hasPendingChanges = false;
    this.selectedClient = undefined;
  }

  deleteClient(client) {
    const i = this.clients.indexOf(client);
    this.clients.splice(i, 1);
    this.clientService.clientList$.next(this.clients);
    this.selectedClient = undefined;
  }

  addClient(client) {
    const d = new Date();
    this.selectedClient[`id`] = this.getRandomId(d);
    console.log(this.selectedClient[`id`]);
    this.selectedClient.name = this.pendingChanges[`name`];
    this.selectedClient.location = this.pendingChanges[`location`];
    this.selectedClient.disposition = this.pendingChanges[`disposition`];
    this.pendingChanges = { name: {}, location: {}, disposition: '' };
    this.hasPendingChanges = false;
    this.clients.splice(0, 0, client);
    this.clientService.clientList$.next(this.clients);
    this.selectedClient = undefined;
  }

  saveClient() {
    const i = this.clients.indexOf(this.selectedClient);
    console.log(this.pendingChanges[`disposition`]);
    const f = this.pendingChanges[`name`][`first`] ? this.pendingChanges[`name`][`first`] : this.selectedClient.name.first;
    const l = this.pendingChanges[`name`][`last`] ? this.pendingChanges[`name`][`last`] : this.selectedClient.name.last;
    const c = this.pendingChanges[`location`][`city`] ? this.pendingChanges[`location`][`city`] : this.selectedClient.location.city;
    const s = this.pendingChanges[`location`][`state`] ? this.pendingChanges[`location`][`state`] : this.selectedClient.location.state;
    const d = this.pendingChanges[`disposition`] !== '' ? this.pendingChanges[`disposition`] : this.selectedClient.disposition;
    this.selectedClient.name.first = f;
    this.selectedClient.name.last = l;
    this.selectedClient.location.city = c;
    this.selectedClient.location.state = s;
    this.selectedClient.disposition = d;
    this.clients[`${i}`] = this.selectedClient;
    this.clientService.clientList$.next(this.clients);
    this.pendingChanges = { name: {}, location: {}, disposition: '' };
    this.selectedClient = undefined;
  }

  getRandomId(time) {
    return Math.floor(Math.random() * Math.floor(time));
  }

}
