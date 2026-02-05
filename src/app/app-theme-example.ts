/**
 * Example: How to use client themes in your real application
 */

import { Component, OnInit } from '@angular/core';
import { applyClientTheme, type ClientId, type ThemeVariant } from '../themes/client-themes';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Your app content -->
      <router-outlet />

      <!-- Optional: Theme switcher for testing -->
      <div class="theme-switcher" *ngIf="isDevelopment">
        <select (change)="onClientChange($event)">
          <option value="zgames">ZGames</option>
          <option value="casino1">Casino 1</option>
          <option value="casino2">Casino 2</option>
          <option value="casino3">Casino 3</option>
        </select>

        <select (change)="onThemeChange($event)">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  isDevelopment = !environment.production;

  ngOnInit() {
    // Option 1: Detect client from subdomain
    const clientId = this.detectClientFromSubdomain();

    // Option 2: Get from environment config
    // const clientId = environment.clientId;

    // Option 3: Get from user preferences (localStorage)
    const savedTheme = (localStorage.getItem('theme-variant') as ThemeVariant) || 'light';

    // Apply theme
    applyClientTheme(clientId, savedTheme);
  }

  /**
   * Detect client from subdomain
   * casino1.example.com -> 'casino1'
   * casino2.example.com -> 'casino2'
   */
  private detectClientFromSubdomain(): ClientId {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    const validClients: ClientId[] = ['zgames', 'casino1', 'casino2', 'casino3'];

    if (validClients.includes(subdomain as ClientId)) {
      return subdomain as ClientId;
    }

    return 'zgames'; // default
  }

  onClientChange(event: Event) {
    const clientId = (event.target as HTMLSelectElement).value as ClientId;
    const variant = (localStorage.getItem('theme-variant') as ThemeVariant) || 'light';
    applyClientTheme(clientId, variant);
    localStorage.setItem('client-id', clientId);
  }

  onThemeChange(event: Event) {
    const variant = (event.target as HTMLSelectElement).value as ThemeVariant;
    const clientId = (localStorage.getItem('client-id') as ClientId) || 'zgames';
    applyClientTheme(clientId, variant);
    localStorage.setItem('theme-variant', variant);
  }
}
