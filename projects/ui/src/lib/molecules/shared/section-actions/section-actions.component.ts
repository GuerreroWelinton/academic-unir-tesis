import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, input, output } from '@angular/core';
import {
  type ButtonFontFamily,
  ZgButtonComponent,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from '../../../atoms/button/button.component';

@Component({
  selector: 'zg-section-actions',
  standalone: true,
  imports: [NgTemplateOutlet, ZgButtonComponent],
  templateUrl: './section-actions.component.html',
  styleUrl: './section-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-section-actions"',
    '[attr.data-size]': 'size()',
  },
})
export class ZgSectionActionsComponent {
  allLabel = input<string>('All');
  prevLabel = input<string>('‹');
  nextLabel = input<string>('›');

  allContentTemplate = input<TemplateRef<unknown> | null>(null);
  prevContentTemplate = input<TemplateRef<unknown> | null>(null);
  nextContentTemplate = input<TemplateRef<unknown> | null>(null);

  allAriaLabel = input<string>('View all');
  prevAriaLabel = input<string>('Previous');
  nextAriaLabel = input<string>('Next');
  groupAriaLabel = input<string>('Section actions');

  size = input<ButtonSize>('md');
  fontFamily = input<ButtonFontFamily>('base');

  allVariant = input<ButtonVariant>('primary');
  navVariant = input<ButtonVariant>('secondary');

  allShape = input<ButtonShape>('pill');
  navShape = input<ButtonShape>('square');

  disableAll = input<boolean>(false);
  disablePrev = input<boolean>(false);
  disableNext = input<boolean>(false);

  allClicked = output<void>();
  prevClicked = output<void>();
  nextClicked = output<void>();

  protected onAllClicked(): void {
    if (this.disableAll()) {
      return;
    }
    this.allClicked.emit();
  }

  protected onPrevClicked(): void {
    if (this.disablePrev()) {
      return;
    }
    this.prevClicked.emit();
  }

  protected onNextClicked(): void {
    if (this.disableNext()) {
      return;
    }
    this.nextClicked.emit();
  }
}
