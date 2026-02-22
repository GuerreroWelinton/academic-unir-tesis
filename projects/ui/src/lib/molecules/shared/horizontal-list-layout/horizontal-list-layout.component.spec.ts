import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgChipComponent } from '../../../atoms/chip/chip.component';
import { ZgHorizontalListLayoutComponent } from './horizontal-list-layout.component';

@Component({
  standalone: true,
  imports: [ZgHorizontalListLayoutComponent, ZgChipComponent],
  template: `
    <zg-horizontal-list-layout [ariaLabel]="ariaLabel" [layoutMode]="layoutMode">
      @for (item of items; track item.id) {
        <li zg-horizontal-list-layout-items>
          <zg-chip [selected]="item.selected" [disabled]="item.disabled">{{ item.label }}</zg-chip>
        </li>
      }
    </zg-horizontal-list-layout>
  `,
})
class TestHostHorizontalListLayoutComponent {
  ariaLabel = 'Casino categories';
  layoutMode: 'scroll' | 'wrap' = 'scroll';
  items = [
    { id: 'all', label: 'All games', selected: true, disabled: false },
    { id: 'slots', label: 'Slots', selected: false, disabled: false },
    { id: 'live', label: 'Live casino', selected: false, disabled: true },
  ];
}

@Component({
  standalone: true,
  imports: [ZgHorizontalListLayoutComponent],
  template: `<zg-horizontal-list-layout></zg-horizontal-list-layout>`,
})
class TestHostHorizontalListLayoutEmptyComponent {}

describe('ZgHorizontalListLayoutComponent', () => {
  let fixture: ComponentFixture<TestHostHorizontalListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostHorizontalListLayoutComponent, TestHostHorizontalListLayoutEmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostHorizontalListLayoutComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should set nav aria label from input', () => {
    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('Casino categories');
  });

  it('should expose layout mode in host attribute', () => {
    const isolatedFixture = TestBed.createComponent(ZgHorizontalListLayoutComponent);
    isolatedFixture.componentRef.setInput('layoutMode', 'scroll');
    isolatedFixture.detectChanges();

    const host = isolatedFixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-layout-mode')).toBe('scroll');

    isolatedFixture.componentRef.setInput('layoutMode', 'wrap');
    isolatedFixture.detectChanges();

    expect(host.getAttribute('data-layout-mode')).toBe('wrap');
  });

  it('should project chip items rendered by host loop', () => {
    const items = fixture.debugElement.queryAll(By.css('li[zg-horizontal-list-layout-items]'));
    const chips = fixture.debugElement.queryAll(By.css('zg-chip'));

    expect(items.length).toBe(3);
    expect(chips.length).toBe(3);
  });

  it('should preserve disabled and selected states from projected chips', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.getAttribute('aria-pressed')).toBe('true');
    expect(buttons[2].nativeElement.disabled).toBe(true);
  });

  it('should render without projected items', () => {
    const emptyFixture = TestBed.createComponent(TestHostHorizontalListLayoutEmptyComponent);
    emptyFixture.detectChanges();

    const nav = emptyFixture.debugElement.query(By.css('nav'));
    const items = emptyFixture.debugElement.queryAll(By.css('li'));

    expect(nav).toBeTruthy();
    expect(items.length).toBe(0);
  });

  it('should emit scroll state when list can scroll', () => {
    const layoutDebug = fixture.debugElement.query(By.directive(ZgHorizontalListLayoutComponent));
    const layoutComponent = layoutDebug.componentInstance as ZgHorizontalListLayoutComponent;
    const navElement = fixture.debugElement.query(By.css('.zg-horizontal-list-layout__nav'))
      .nativeElement as HTMLElement;
    const emitSpy = vi.spyOn(layoutComponent.scrollStateChange, 'emit');

    Object.defineProperty(navElement, 'scrollWidth', { value: 900, configurable: true });
    Object.defineProperty(navElement, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(navElement, 'scrollLeft', { value: 120, configurable: true });

    layoutComponent.refreshScrollState();

    expect(emitSpy).toHaveBeenCalledWith({ canScrollPrev: true, canScrollNext: true });
  });
});
