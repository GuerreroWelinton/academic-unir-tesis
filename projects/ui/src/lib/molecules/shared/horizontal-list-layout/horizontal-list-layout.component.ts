import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'zg-horizontal-list-layout',
  standalone: true,
  templateUrl: './horizontal-list-layout.component.html',
  styleUrl: './horizontal-list-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-horizontal-list-layout"',
  },
})
export class ZgHorizontalListLayoutComponent {
  ariaLabel = input<string>('Horizontal list');
}
