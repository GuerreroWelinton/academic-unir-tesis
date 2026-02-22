import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgSectionActionsComponent } from './section-actions.component';

@Component({
  standalone: true,
  imports: [ZgSectionActionsComponent, ZgButtonComponent],
  template: `
    <zg-section-actions [groupAriaLabel]="groupAriaLabel">
      <zg-button
        zg-section-actions-all
        [variant]="'primary'"
        [shape]="'pill'"
        [size]="'md'"
        [fontFamily]="'base'"
        (clicked)="allClicks = allClicks + 1"
      >
        All
      </zg-button>

      <zg-button
        zg-section-actions-prev
        [variant]="'secondary'"
        [shape]="'square'"
        [size]="'md'"
        [fontFamily]="'base'"
        (clicked)="prevClicks = prevClicks + 1"
      >
        ‹
      </zg-button>

      <zg-button
        zg-section-actions-next
        [variant]="'secondary'"
        [shape]="'square'"
        [size]="'md'"
        [fontFamily]="'base'"
        (clicked)="nextClicks = nextClicks + 1"
      >
        ›
      </zg-button>
    </zg-section-actions>
  `,
})
class TestHostSectionActionsComponent {
  groupAriaLabel = 'Section actions';
  allClicks = 0;
  prevClicks = 0;
  nextClicks = 0;
}

@Component({
  standalone: true,
  imports: [ZgSectionActionsComponent],
  template: `<zg-section-actions></zg-section-actions>`,
})
class TestHostEmptySectionActionsComponent {}

describe('ZgSectionActionsComponent', () => {
  let fixture: ComponentFixture<TestHostSectionActionsComponent>;
  let host: TestHostSectionActionsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ZgSectionActionsComponent,
        TestHostSectionActionsComponent,
        TestHostEmptySectionActionsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostSectionActionsComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should project all three slot actions', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.querySelector('[zg-section-actions-all]')).toBeTruthy();
    expect(hostElement.querySelector('[zg-section-actions-prev]')).toBeTruthy();
    expect(hostElement.querySelector('[zg-section-actions-next]')).toBeTruthy();
  });

  it('should set group aria label from input', () => {
    const isolatedFixture = TestBed.createComponent(ZgSectionActionsComponent);
    isolatedFixture.componentRef.setInput('groupAriaLabel', 'Top games actions');
    isolatedFixture.detectChanges();

    const group = isolatedFixture.debugElement.query(By.css('[role="group"]'));
    expect(group.nativeElement.getAttribute('aria-label')).toBe('Top games actions');
  });

  it('should delegate click handling to projected buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();
    buttons[2].nativeElement.click();

    expect(host.allClicks).toBe(1);
    expect(host.prevClicks).toBe(1);
    expect(host.nextClicks).toBe(1);
  });

  it('should render without projected content', () => {
    const emptyFixture = TestBed.createComponent(TestHostEmptySectionActionsComponent);
    emptyFixture.detectChanges();

    const buttons = emptyFixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(0);
  });
});
