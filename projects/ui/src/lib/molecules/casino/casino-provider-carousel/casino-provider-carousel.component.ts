import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export interface CasinoProviderCarouselItem {
  id: string;
  name: string;
  logoUrl: string;
  logoAlt?: string;
  disabled?: boolean;
}

@Component({
  selector: 'zg-casino-provider-carousel',
  standalone: true,
  templateUrl: './casino-provider-carousel.component.html',
  styleUrl: './casino-provider-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-provider-carousel"',
    '[attr.data-animated]': 'isAnimated() ? true : null',
  },
})
export class ZgCasinoProviderCarouselComponent {
  items = input<readonly CasinoProviderCarouselItem[]>([]);
  ariaLabel = input<string>('Casino providers carousel');
  emptyMessage = input<string>('No providers available');
  animationDuration = input<string>('24s');

  providerSelected = output<CasinoProviderCarouselItem>();

  protected isAnimated = computed(() => this.items().length > 1);

  protected getProviderLogoAlt(item: CasinoProviderCarouselItem): string {
    return item.logoAlt?.trim() || `${item.name} logo`;
  }

  protected onProviderClick(item: CasinoProviderCarouselItem): void {
    if (item.disabled) {
      return;
    }
    this.providerSelected.emit(item);
  }
}
