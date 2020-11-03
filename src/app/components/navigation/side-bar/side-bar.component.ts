import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  navActive: boolean;

  constructor(public navServ: NavigationService) {
    this.navServ.showSideNav.subscribe(r => {
      this.navActive = r;
    });

  }

  ngOnInit(): void {
  }
}
