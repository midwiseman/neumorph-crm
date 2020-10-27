import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation.service';

@Component({
  selector: 'app-toggle-side-bar',
  templateUrl: './toggle-side-bar.component.html',
  styleUrls: ['./toggle-side-bar.component.scss']
})
export class ToggleSideBarComponent implements OnInit {

  constructor(public navServ: NavigationService) { }

  ngOnInit(): void {
  }

}
