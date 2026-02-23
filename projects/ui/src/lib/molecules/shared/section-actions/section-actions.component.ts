import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'zg-section-actions',
  standalone: true,
  templateUrl: './section-actions.component.html',
  styleUrl: './section-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-section-actions"',
  },
})
export class ZgSectionActionsComponent {
  groupAriaLabel = input<string>('Section actions');
}
