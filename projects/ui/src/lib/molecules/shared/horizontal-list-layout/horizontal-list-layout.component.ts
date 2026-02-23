import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
} from '@angular/core';

export type HorizontalListLayoutMode = 'scroll' | 'wrap';
export interface HorizontalListScrollState {
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

@Component({
  selector: 'zg-horizontal-list-layout',
  standalone: true,
  templateUrl: './horizontal-list-layout.component.html',
  styleUrl: './horizontal-list-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-horizontal-list-layout"',
    '[attr.data-layout-mode]': 'layoutMode()',
  },
})
export class ZgHorizontalListLayoutComponent implements AfterViewInit {
  @ViewChild('navElement') private navElement?: ElementRef<HTMLElement>;

  ariaLabel = input<string>('Horizontal list');
  layoutMode = input<HorizontalListLayoutMode>('scroll');
  scrollStep = input<number>(320);
  scrollBehavior = input<ScrollBehavior>('smooth');

  scrollStateChange = output<HorizontalListScrollState>();

  ngAfterViewInit(): void {
    queueMicrotask(() => this.emitScrollState());
  }

  scrollNext(): void {
    this.scrollBy(this.scrollStep());
  }

  scrollPrev(): void {
    this.scrollBy(-this.scrollStep());
  }

  refreshScrollState(): void {
    this.emitScrollState();
  }

  protected onNavScroll(): void {
    this.emitScrollState();
  }

  private scrollBy(offset: number, behavior: ScrollBehavior = this.scrollBehavior()): void {
    const nav = this.navElement?.nativeElement;
    if (!nav || this.layoutMode() !== 'scroll') {
      return;
    }

    if (typeof nav.scrollBy === 'function') {
      nav.scrollBy({ left: offset, behavior });
    } else {
      nav.scrollLeft += offset;
    }
    this.emitScrollState();
  }

  private emitScrollState(): void {
    const nav = this.navElement?.nativeElement;
    if (!nav || this.layoutMode() !== 'scroll') {
      this.scrollStateChange.emit({ canScrollPrev: false, canScrollNext: false });
      return;
    }

    const epsilon = 1;
    const maxLeft = Math.max(nav.scrollWidth - nav.clientWidth, 0);
    const currentLeft = Math.max(nav.scrollLeft, 0);

    this.scrollStateChange.emit({
      canScrollPrev: currentLeft > epsilon,
      canScrollNext: currentLeft < maxLeft - epsilon,
    });
  }
}
