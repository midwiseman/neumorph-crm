import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  showSideNav = new BehaviorSubject<boolean>(true);

  constructor() {}

  toggleSideNav(): void {
    this.showSideNav.next(!this.showSideNav.getValue());
  }
}
