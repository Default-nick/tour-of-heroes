import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  menuItems: MenuItem[] = [
    {
      matIcon: 'dashboard',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard',
    },
    {
      fasIcon: 'mask',
      routerLink: '/heroes',
      toolTipText: 'Heroes',
    },
  ];
  title = 'Tour of Heroes';

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
