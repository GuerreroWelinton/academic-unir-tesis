import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZgButtonComponent } from '@zgames/ui';
import { applyThemeFromRegistry, getThemeVariantsFromRegistry } from '@zgames/design-tokens';
import { CLIENT_THEMES, type ClientId } from './themes/client-themes';

@Component({
  selector: 'zg-root',
  imports: [RouterOutlet, ZgButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('zg-ui');
  protected readonly clientOptions: ClientId[] = ['client1', 'client2'];
  protected readonly themeOptions = signal<string[]>(
    getThemeVariantsFromRegistry(CLIENT_THEMES, 'client1'),
  );
  protected readonly selectedClient = signal<ClientId>('client1');
  protected readonly selectedVariant = signal<string>('light');

  ngOnInit(): void {
    applyThemeFromRegistry(CLIENT_THEMES, this.selectedClient(), {
      variant: this.selectedVariant(),
      fallbackClientId: 'client1',
    });
  }

  onClientChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const clientId = target?.value ?? 'client1';
    const nextClient = clientId as ClientId;
    const variants = getThemeVariantsFromRegistry(CLIENT_THEMES, nextClient, 'client1');
    const currentVariant = this.selectedVariant();
    const nextVariant = variants.includes(currentVariant) ? currentVariant : variants[0] || 'light';

    this.selectedClient.set(nextClient);
    this.themeOptions.set(variants);
    this.selectedVariant.set(nextVariant);

    applyThemeFromRegistry(CLIENT_THEMES, nextClient, {
      variant: nextVariant,
      fallbackClientId: 'client1',
    });
  }

  onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const variant = target?.value ?? 'light';
    this.selectedVariant.set(variant);
    applyThemeFromRegistry(CLIENT_THEMES, this.selectedClient(), {
      variant,
      fallbackClientId: 'client1',
    });
  }

  onButtonClick(): void {
    alert('¡ZGames UI funciona!');
  }
}
