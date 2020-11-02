import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  hideSideNav: boolean;

  constructor() {
    this.hideSideNav = false;
  }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }
}
