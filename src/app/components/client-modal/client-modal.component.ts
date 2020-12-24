import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }
}
