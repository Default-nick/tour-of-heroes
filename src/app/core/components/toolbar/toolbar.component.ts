import { MenuItem } from './../../models/menu-item.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() isLoggedIn: boolean | null = null;
  @Input() menuItems: MenuItem[] = [];
  @Input() title = '';

  @Output() private logout = new EventEmitter();

  onLogout(): void {
    this.logout.emit();
  }
}
