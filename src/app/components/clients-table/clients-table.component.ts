import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/client-service.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  clients: any;

  constructor(private clientService: ClientServiceService) {
    this.clientService.clientList$.subscribe(c => {
      this.clients = c;
      console.log(c);
    });
  }

  ngOnInit(): void {
  }

}
