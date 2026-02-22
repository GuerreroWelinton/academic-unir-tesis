import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'zg-casino-home-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './casino-home-hero.component.html',
  styleUrl: './casino-home-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-home-hero"',
    '[attr.aria-label]': 'ariaLabel()',
    '[style.--zg-casino-home-hero-min-height]': 'minHeight()',
    '[style.--zg-casino-home-hero-overlay-opacity]': 'overlayOpacityValue()',
    '[style.--zg-casino-home-hero-zoom-duration]': 'zoomDurationValue()',
    '[style.--zg-casino-home-hero-zoom-scale-min]': 'zoomScaleMinValue()',
    '[style.--zg-casino-home-hero-zoom-scale-max]': 'zoomScaleMaxValue()',
  },
})
export class ZgCasinoHomeHeroComponent {
  backgroundImageUrl = input<string>('https://placehold.co/1400x700?text=Casino+Hero+Background');
  backgroundImageAlt = input<string>('Casino hero background');
  characterImageUrl = input<string>('https://placehold.co/620x720?text=Casino+Hero+Character');
  characterImageAlt = input<string>('Casino hero character');

  title = input<string>('CASINO');
  description = input<string>('Diversion, luck and big prizes await.');
  highlightText = input<string>('Start playing and win big!');
  caption = input<string>('Luck follows you');

  minHeight = input<string>('32rem');
  overlayOpacity = input<number>(0.55);

  zoomEnabled = input<boolean>(true);
  zoomDurationMs = input<number>(8000);
  zoomScaleMin = input<number>(1);
  zoomScaleMax = input<number>(1.06);

  ariaLabel = input<string>('Casino home hero');

  protected overlayOpacityValue = computed(() => {
    const value = this.overlayOpacity();
    return `${Math.min(Math.max(value, 0), 1)}`;
  });

  protected zoomDurationValue = computed(() => `${Math.max(this.zoomDurationMs(), 1000)}ms`);
  protected zoomScaleMinValue = computed(() => `${Math.max(this.zoomScaleMin(), 0.7)}`);
  protected zoomScaleMaxValue = computed(() => `${Math.max(this.zoomScaleMax(), 0.8)}`);
}
