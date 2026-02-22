import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SectionTitleTone = 'default' | 'primary' | 'success';
export type SectionTitleSize = 'sm' | 'md' | 'lg';
export type SectionTitleFontFamily = 'base' | 'secondary';

@Component({
  selector: 'zg-section-title',
  standalone: true,
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-section-title"',
    '[attr.data-tone]': 'tone()',
    '[attr.data-size]': 'size()',
    '[attr.data-accent]': 'showAccent()',
    '[attr.data-font-family]': 'fontFamily()',
  },
})
export class ZgSectionTitleComponent {
  label = input<string>('');
  tone = input<SectionTitleTone>('primary');
  size = input<SectionTitleSize>('md');
  showAccent = input<boolean>(false);
  fontFamily = input<SectionTitleFontFamily>('secondary');
  ariaLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);
}
