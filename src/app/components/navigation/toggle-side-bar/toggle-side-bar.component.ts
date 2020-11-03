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
  // This HostListener and function below serves as a media-query to toggle side-nav and side-nav toggler state based on screen size, hiding the side-nav on smaller
  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  onResize(event) {
    const sw = event.currentTarget.screen.width;
    if (this.navActive === true) {
      if (sw <= 576) {
        this.navServ.showSideNav.next(false);
      }
    } else {
      if (sw >= 1024) {
        this.navServ.showSideNav.next(true);
    }}
  }

  constructor(public navServ: NavigationService) {
  }

  ngOnInit(): void {
    // shared subscription to showSideNav behavior subject to keep toggle switch and side-nav insync
    this.navServ.showSideNav.subscribe(r => {
      this.navActive = r;
    });
    // shows/hides sidenav based on initial screen size
    if (this.navActive === true && window.innerWidth <= 576) {
      this.navServ.showSideNav.next(false);
    } else { this.navServ.showSideNav.next(true); }
  }

  // toggles side-nav based on click, rather than screen size
  logNav(): void {
    this.navServ.showSideNav.next(!this.navActive);
  }

}
