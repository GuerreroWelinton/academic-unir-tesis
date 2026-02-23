import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export interface SiteHeaderNavItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'zg-site-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-site-header"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ZgSiteHeaderComponent {
  brandLabel = input<string>('Brand');
  brandHref = input<string | null>(null);
  logoUrl = input<string | null>(null);
  logoAlt = input<string>('Brand logo');
  logoWidth = input<number>(140);
  logoHeight = input<number>(40);
  ariaLabel = input<string>('Site header');
  navAriaLabel = input<string>('Primary navigation');
  navItems = input<readonly SiteHeaderNavItem[]>([]);

  showAuthActions = input<boolean>(true);
  loginLabel = input<string>('Log in');
  registerLabel = input<string>('Sign up');

  brandClicked = output<void>();
  navItemClicked = output<SiteHeaderNavItem>();
  loginClicked = output<void>();
  registerClicked = output<void>();
  navOpen = signal(false);

  protected onBrandClick(event: Event): void {
    if (!this.brandHref()) {
      event.preventDefault();
    }

    this.brandClicked.emit();
  }

  protected onNavItemClick(event: Event, item: SiteHeaderNavItem): void {
    if (item.disabled === true) {
      event.preventDefault();
      return;
    }

    if (!item.href) {
      event.preventDefault();
    }

    this.navItemClicked.emit(item);
  }

  protected onLoginClick(): void {
    this.loginClicked.emit();
  }

  protected onRegisterClick(): void {
    this.registerClicked.emit();
  }

  protected toggleNav(): void {
    this.navOpen.update((value) => !value);
  }
}
