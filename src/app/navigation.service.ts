import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  hideSideNav = new BehaviorSubject<boolean>(true);

  constructor() {}

  toggleSideNav(): void {
    this.hideSideNav.next(!this.hideSideNav.getValue());
  }
}
