import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  type CategoryFilterTabItem,
  ZgCategoryFilterTabsComponent,
} from './category-filter-tabs.component';

@Component({
  standalone: true,
  imports: [ZgCategoryFilterTabsComponent],
  template: `
    <ng-template #tabIcon>
      <span data-testid="tab-icon">*</span>
    </ng-template>

    <zg-category-filter-tabs [items]="items" selectedId="all"></zg-category-filter-tabs>
  `,
})
class TestHostCategoryFilterTabsComponent implements OnInit {
  @ViewChild('tabIcon', { static: true }) tabIconTemplate!: TemplateRef<{
    $implicit: CategoryFilterTabItem;
  }>;

  items: CategoryFilterTabItem[] = [];

  ngOnInit(): void {
    this.items = [{ id: 'all', label: 'All games', iconTemplate: this.tabIconTemplate }];
  }
}

describe('ZgCategoryFilterTabsComponent', () => {
  let component: ZgCategoryFilterTabsComponent;
  let fixture: ComponentFixture<ZgCategoryFilterTabsComponent>;

  const items: CategoryFilterTabItem[] = [
    { id: 'all', label: 'All games' },
    { id: 'slots', label: 'Slots' },
    { id: 'live', label: 'Live casino' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCategoryFilterTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCategoryFilterTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('selectedId', 'all');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    const chips = fixture.debugElement.queryAll(By.css('zg-chip'));
    expect(chips.length).toBe(3);
  });

  it('should mark selected tab from selectedId', () => {
    const chips = fixture.debugElement.queryAll(By.css('zg-chip'));
    expect(chips[0].nativeElement.getAttribute('data-selected')).toBe('true');
    expect(chips[1].nativeElement.getAttribute('data-selected')).toBe('false');
  });

  it('should emit selectedIdChange and changed when selecting another tab', () => {
    const selectedIdSpy = vi.spyOn(component.selectedIdChange, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    const chipButtons = fixture.debugElement.queryAll(By.css('.zg-chip__button'));

    chipButtons[1].nativeElement.click();

    expect(selectedIdSpy).toHaveBeenCalledWith('slots');
    expect(changedSpy).toHaveBeenCalledWith(items[1]);
  });

  it('should not emit selectedIdChange when clicking current tab', () => {
    const selectedIdSpy = vi.spyOn(component.selectedIdChange, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    const chipButtons = fixture.debugElement.queryAll(By.css('.zg-chip__button'));

    chipButtons[0].nativeElement.click();

    expect(selectedIdSpy).not.toHaveBeenCalled();
    expect(changedSpy).toHaveBeenCalledWith(items[0]);
  });

  it('should not emit events for disabled item', () => {
    fixture.componentRef.setInput('items', [
      { id: 'all', label: 'All games' },
      { id: 'slots', label: 'Slots', disabled: true },
    ]);
    fixture.detectChanges();

    const selectedIdSpy = vi.spyOn(component.selectedIdChange, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    const chipButtons = fixture.debugElement.queryAll(By.css('.zg-chip__button'));

    chipButtons[1].nativeElement.click();

    expect(selectedIdSpy).not.toHaveBeenCalled();
    expect(changedSpy).not.toHaveBeenCalled();
  });

  it('should expose navigation aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Casino category filters');
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('Casino category filters');
  });

  it('should render projected icon template when item provides iconTemplate', () => {
    const hostFixture = TestBed.createComponent(TestHostCategoryFilterTabsComponent);
    hostFixture.detectChanges();

    const icon = hostFixture.debugElement.query(By.css('[data-testid="tab-icon"]'));
    expect(icon).toBeTruthy();
  });
});
