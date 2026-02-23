import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
  current?: boolean;
}

@Component({
  selector: 'zg-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-breadcrumb"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ZgBreadcrumbComponent {
  items = input<readonly BreadcrumbItem[]>([]);
  ariaLabel = input<string>('Breadcrumb');
  separator = input<string>('>');

  itemClicked = output<BreadcrumbItem>();

  protected isCurrent(item: BreadcrumbItem, index: number): boolean {
    if (item.current === true) {
      return true;
    }

    return index === this.items().length - 1;
  }

  protected isDisabled(item: BreadcrumbItem, index: number): boolean {
    return item.disabled === true || this.isCurrent(item, index);
  }

  protected onItemClick(event: Event, item: BreadcrumbItem, index: number): void {
    event.preventDefault();

    if (this.isDisabled(item, index)) {
      return;
    }

    this.itemClicked.emit(item);
  }
}
