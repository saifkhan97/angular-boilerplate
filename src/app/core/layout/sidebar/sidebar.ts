


import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface MenuItem {
  label: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private auth = inject(AuthService);

  protected collapsed = signal(false);

  protected menu: MenuItem[] = [
    // { label: 'Users', route: '/users', roles: ['ADMIN'] },
    { label: 'Users', route: '/users' },
    { label: 'Dashboard', route: '/dashboard' }
  ];

  toggle(): void {
    this.collapsed.update(v => !v);
  }

  canShow(item: MenuItem): boolean {
    if (!item.roles) return true;
    return item.roles.some(role => this.auth.hasRole(role));
  }
}
