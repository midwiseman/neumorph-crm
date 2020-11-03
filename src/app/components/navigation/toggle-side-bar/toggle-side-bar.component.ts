import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation.service';

@Component({
  selector: 'app-toggle-side-bar',
  templateUrl: './toggle-side-bar.component.html',
  styleUrls: ['./toggle-side-bar.component.scss']
})
export class ToggleSideBarComponent implements OnInit {
  navActive: boolean;
  width: any;
  height: any;

  // tslint:disable-next-line:max-line-length
  // This HostListener and function below serves as a media-query to manipulate the state of both the sidebar, and the side-bar-toggler; keeping them in sync.
  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  onResize(event) {
    if (event.currentTarget.screen.width < 576) {
      this.navServ.hideSideNav.next(false);
    } else {
      this.navServ.hideSideNav.next(true);
    }
  }

  constructor(public navServ: NavigationService) {
  }

  ngOnInit(): void {
    this.navServ.hideSideNav.subscribe(r => {
      this.navActive = r;
    });
  }

  logNav(): void {
    this.navServ.hideSideNav.next(!this.navActive);
  }

}
