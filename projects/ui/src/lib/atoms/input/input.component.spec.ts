import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZgInputComponent } from './input.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

@Component({
  standalone: true,
  imports: [ZgInputComponent],
  template: `
    <zg-input label="Search" placeholder="Search value">
      <span icon-left data-testid="left-icon">L</span>
      <span icon-right data-testid="right-icon">R</span>
    </zg-input>
  `,
})
class TestHostInputIconsComponent {}

@Component({
  standalone: true,
  imports: [ZgInputComponent],
  template: `
    <zg-input label="Clearable" [value]="'value'" [readonly]="false" [disabled]="false">
      <span clear-icon data-testid="custom-clear-icon">*</span>
    </zg-input>
  `,
})
class TestHostInputClearIconComponent {}

describe('ZgInputComponent', () => {
  let component: ZgInputComponent;
  let fixture: ComponentFixture<ZgInputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgInputComponent, TestHostInputIconsComponent, TestHostInputClearIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('.zg-input__field'));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with label', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('.zg-input__label'));
    expect(labelElement).toBeTruthy();
  });

  it('should emit changed event on input', () => {
    const spy = vi.spyOn(component.changed, 'emit');
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
    inputElement.nativeElement.value = 'abc';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('abc');
  });

  it('should show clear button after typing even without external value binding', () => {
    fixture.componentRef.setInput('label', 'Search');
    fixture.detectChanges();

    inputElement.nativeElement.value = 'typed';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.zg-input__clear'));
    expect(clearBtn).toBeTruthy();
  });

  it('should emit focused event on focus', () => {
    const spy = vi.spyOn(component.focused, 'emit');
    inputElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit blurred event on blur', () => {
    const spy = vi.spyOn(component.blurred, 'emit');
    inputElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should show error text', () => {
    fixture.componentRef.setInput('error', 'Invalid email');
    fixture.componentRef.setInput('helperText', 'Must be a valid email');
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.zg-input__error'));
    expect(errorElement.nativeElement.textContent).toContain('Invalid email');
  });

  it('should emit cleared event when clear button is clicked', () => {
    const clearedSpy = vi.spyOn(component.cleared, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    fixture.componentRef.setInput('value', 'clear me');
    fixture.componentRef.setInput('label', 'Clearable');
    fixture.detectChanges();
    const clearBtn = fixture.debugElement.query(By.css('.zg-input__clear'));
    clearBtn.nativeElement.click();
    fixture.detectChanges();
    expect(clearedSpy).toHaveBeenCalled();
    expect(changedSpy).toHaveBeenCalledWith('');
  });

  it('should respect disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(inputElement.nativeElement.disabled).toBe(true);
  });

  it('should respect readonly state', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.componentRef.setInput('value', 'read only');
    fixture.detectChanges();
    expect(inputElement.nativeElement.readOnly).toBe(true);
  });

  it('should set unique aria-describedby id for error text', () => {
    fixture.componentRef.setInput('error', 'Invalid');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.zg-input__field'))
      .nativeElement as HTMLInputElement;
    const error = fixture.debugElement.query(By.css('.zg-input__error'))
      .nativeElement as HTMLElement;

    expect(input.getAttribute('aria-describedby')).toBe(error.id);
    expect(error.id).toContain(component.id);
  });

  it('should set unique aria-describedby id for helper text', () => {
    fixture.componentRef.setInput('helperText', 'Helper');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.zg-input__field'))
      .nativeElement as HTMLInputElement;
    const helper = fixture.debugElement.query(By.css('.zg-input__helper'))
      .nativeElement as HTMLElement;

    expect(input.getAttribute('aria-describedby')).toBe(helper.id);
    expect(helper.id).toContain(component.id);
  });

  it('should provide aria-label fallback when visible label is missing', () => {
    fixture.componentRef.setInput('label', '   ');
    fixture.componentRef.setInput('placeholder', 'Search games');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.zg-input__field'))
      .nativeElement as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('Search games');
  });

  it('should generate unique ids per component instance', () => {
    const otherFixture = TestBed.createComponent(ZgInputComponent);
    otherFixture.detectChanges();

    const firstId = component.id;
    const secondId = otherFixture.componentInstance.id;

    expect(firstId).not.toBe(secondId);
    expect(component.inputId).toContain(firstId);
    expect(otherFixture.componentInstance.inputId).toContain(secondId);
  });

  it('should project icon-left and icon-right into their slots', () => {
    const hostFixture = TestBed.createComponent(TestHostInputIconsComponent);
    hostFixture.detectChanges();

    const hostElement = hostFixture.nativeElement as HTMLElement;
    const leftIconSlot = hostElement.querySelector('.zg-input__icon--left');
    const rightIconSlot = hostElement.querySelector('.zg-input__icon--right');
    const leftIcon = hostElement.querySelector('[data-testid="left-icon"]');
    const rightIcon = hostElement.querySelector('[data-testid="right-icon"]');

    expect(leftIconSlot?.contains(leftIcon as Node)).toBe(true);
    expect(rightIconSlot?.contains(rightIcon as Node)).toBe(true);
  });

  it('should show fallback clear icon when custom clear icon is not projected', () => {
    fixture.componentRef.setInput('value', 'abc');
    fixture.componentRef.setInput('readonly', false);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('.zg-input__clear-icon-fallback'));
    const slot = fixture.debugElement.query(By.css('.zg-input__clear-icon-slot'));

    expect(slot).toBeTruthy();
    expect(fallback).toBeTruthy();
    expect(fallback.nativeElement.textContent).toContain('×');
  });

  it('should render projected custom clear icon', () => {
    const hostFixture = TestBed.createComponent(TestHostInputClearIconComponent);
    hostFixture.detectChanges();

    const hostElement = hostFixture.nativeElement as HTMLElement;
    const customClearIcon = hostElement.querySelector('[data-testid="custom-clear-icon"]');
    const clearButton = hostElement.querySelector('.zg-input__clear');

    expect(clearButton).toBeTruthy();
    expect(customClearIcon).toBeTruthy();
    expect(clearButton?.contains(customClearIcon as Node)).toBe(true);
  });
});
