import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, input, output } from '@angular/core';
import {
  ZgChipComponent,
  type ChipSize,
  type ChipVariant,
} from '../../../atoms/chip/chip.component';

export interface CategoryFilterTabItem {
  id: string;
  label: string;
  disabled?: boolean;
  iconTemplate?: TemplateRef<{ $implicit: CategoryFilterTabItem }>;
}

@Component({
  selector: 'zg-category-filter-tabs',
  standalone: true,
  imports: [NgTemplateOutlet, ZgChipComponent],
  templateUrl: './category-filter-tabs.component.html',
  styleUrl: './category-filter-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-category-filter-tabs"',
  },
})
export class ZgCategoryFilterTabsComponent {
  items = input<readonly CategoryFilterTabItem[]>([]);
  selectedId = input<string | null>(null);
  chipVariant = input<ChipVariant>('ghost');
  chipSize = input<ChipSize>('md');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('Category filters');

  selectedIdChange = output<string>();
  changed = output<CategoryFilterTabItem>();

  protected isSelected(item: CategoryFilterTabItem): boolean {
    return this.selectedId() === item.id;
  }

  protected isItemDisabled(item: CategoryFilterTabItem): boolean {
    return this.disabled() || item.disabled === true;
  }

  protected onItemClicked(item: CategoryFilterTabItem): void {
    if (this.isItemDisabled(item)) {
      return;
    }

    if (this.selectedId() !== item.id) {
      this.selectedIdChange.emit(item.id);
    }

    this.changed.emit(item);
  }
}
