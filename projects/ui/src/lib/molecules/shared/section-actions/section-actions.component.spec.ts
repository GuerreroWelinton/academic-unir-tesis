import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ZgSectionActionsComponent } from './section-actions.component';

@Component({
  standalone: true,
  imports: [ZgSectionActionsComponent],
  template: `
    <ng-template #allTpl>
      <span data-testid="all-template">View all games</span>
    </ng-template>
    <ng-template #prevTpl>
      <span data-testid="prev-template">Previous games</span>
    </ng-template>
    <ng-template #nextTpl>
      <span data-testid="next-template">Next games</span>
    </ng-template>

    <zg-section-actions
      [allContentTemplate]="allTpl"
      [prevContentTemplate]="prevTpl"
      [nextContentTemplate]="nextTpl"
    ></zg-section-actions>
  `,
})
class TestHostSectionActionsTemplatesComponent {}

describe('ZgSectionActionsComponent', () => {
  let fixture: ComponentFixture<ZgSectionActionsComponent>;
  let component: ZgSectionActionsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgSectionActionsComponent, TestHostSectionActionsTemplatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgSectionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all and nav labels', () => {
    fixture.componentRef.setInput('allLabel', 'Todos');
    fixture.componentRef.setInput('prevLabel', '‹');
    fixture.componentRef.setInput('nextLabel', '›');
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Todos');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('‹');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('›');
  });

  it('should emit allClicked when all button is clicked', () => {
    const emitSpy = vi.spyOn(component.allClicked, 'emit');
    const allButton = fixture.debugElement.queryAll(By.css('button'))[0];

    allButton.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit prevClicked and nextClicked on nav clicks', () => {
    const prevSpy = vi.spyOn(component.prevClicked, 'emit');
    const nextSpy = vi.spyOn(component.nextClicked, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[1].nativeElement.click();
    buttons[2].nativeElement.click();

    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('should disable buttons by input flags', () => {
    fixture.componentRef.setInput('disableAll', true);
    fixture.componentRef.setInput('disablePrev', true);
    fixture.componentRef.setInput('disableNext', true);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.disabled).toBe(true);
    expect(buttons[1].nativeElement.disabled).toBe(true);
    expect(buttons[2].nativeElement.disabled).toBe(true);
  });

  it('should not emit events when buttons are disabled', () => {
    const allSpy = vi.spyOn(component.allClicked, 'emit');
    const prevSpy = vi.spyOn(component.prevClicked, 'emit');
    const nextSpy = vi.spyOn(component.nextClicked, 'emit');

    fixture.componentRef.setInput('disableAll', true);
    fixture.componentRef.setInput('disablePrev', true);
    fixture.componentRef.setInput('disableNext', true);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();
    buttons[2].nativeElement.click();

    expect(allSpy).not.toHaveBeenCalled();
    expect(prevSpy).not.toHaveBeenCalled();
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('should render projected templates when template inputs are provided', () => {
    const hostFixture = TestBed.createComponent(TestHostSectionActionsTemplatesComponent);
    hostFixture.detectChanges();

    const hostElement = hostFixture.nativeElement as HTMLElement;
    expect(hostElement.querySelector('[data-testid="all-template"]')).toBeTruthy();
    expect(hostElement.querySelector('[data-testid="prev-template"]')).toBeTruthy();
    expect(hostElement.querySelector('[data-testid="next-template"]')).toBeTruthy();
  });
});
