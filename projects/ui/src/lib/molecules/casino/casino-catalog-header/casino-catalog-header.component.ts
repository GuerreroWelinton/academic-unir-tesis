import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import {
  type BreadcrumbItem,
  ZgBreadcrumbComponent,
} from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'zg-casino-catalog-header',
  standalone: true,
  imports: [ZgBreadcrumbComponent],
  templateUrl: './casino-catalog-header.component.html',
  styleUrl: './casino-catalog-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-catalog-header"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ZgCasinoCatalogHeaderComponent {
  breadcrumbs = input<readonly BreadcrumbItem[]>([]);
  breadcrumbAriaLabel = input<string>('Catalog breadcrumb');
  title = input<string>('Most bet games');
  gamesCount = input<number | null>(null);
  gamesCountSuffix = input<string>('games');
  ariaLabel = input<string>('Casino catalog header');

  breadcrumbItemClicked = output<BreadcrumbItem>();

  protected countLabel = computed(() => {
    const count = this.gamesCount();
    if (count === null || count < 0) {
      return null;
    }
    return `${count.toLocaleString()} ${this.gamesCountSuffix()}`;
  });

  protected onBreadcrumbItemClicked(item: BreadcrumbItem): void {
    this.breadcrumbItemClicked.emit(item);
  }
}
