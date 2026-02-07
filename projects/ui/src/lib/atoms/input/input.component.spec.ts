import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZgInputComponent } from './input.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ZgInputComponent', () => {
  let component: ZgInputComponent;
  let fixture: ComponentFixture<ZgInputComponent>;
  let inputElement: DebugElement;
  let errorElement: DebugElement;
  let helperElement: DebugElement;
  let clearButtonElement: DebugElement;
  let labelElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('.zg-input__field'));
    errorElement = fixture.debugElement.query(By.css('.zg-input__error'));
    helperElement = fixture.debugElement.query(By.css('.zg-input__helper'));
    clearButtonElement = fixture.debugElement.query(By.css('.zg-input__clear'));
    labelElement = fixture.debugElement.query(By.css('.zg-input__label'));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with label', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();
    expect(labelElement.nativeElement.textContent).toContain('Username');
    expect(inputElement).toBeTruthy();
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

  it('should show error and helper text', () => {
    fixture.componentRef.setInput('error', 'Invalid email');
    fixture.componentRef.setInput('helperText', 'Must be a valid email');
    fixture.detectChanges();
    expect(errorElement.nativeElement.textContent).toContain('Invalid email');
    expect(helperElement.nativeElement.textContent).toContain('Must be a valid email');
  });

  it('should emit cleared event when clear button is clicked', () => {
    const clearedSpy = vi.spyOn(component.cleared, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    fixture.componentRef.setInput('value', 'clear me');
    fixture.componentRef.setInput('label', 'Clearable');
    fixture.detectChanges();
    clearButtonElement.nativeElement.click();
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
});
