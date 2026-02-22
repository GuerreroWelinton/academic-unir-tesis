import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zg-content-section-header',
  standalone: true,
  templateUrl: './content-section-header.component.html',
  styleUrl: './content-section-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-content-section-header"',
  },
})
export class ZgContentSectionHeaderComponent {}
