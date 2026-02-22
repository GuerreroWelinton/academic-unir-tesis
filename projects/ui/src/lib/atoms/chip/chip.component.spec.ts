import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZgChipComponent } from './chip.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [ZgChipComponent],
  template: `
    <zg-chip>
      <span icon-left data-testid="slot-icon-left">L</span>
      <span data-testid="slot-label">Chip Label</span>
      <span icon-right data-testid="slot-icon-right">R</span>
    </zg-chip>
  `,
})
class TestHostChipSlotsComponent {}

describe('ZgChipComponent', () => {
  let component: ZgChipComponent;
  let fixture: ComponentFixture<ZgChipComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgChipComponent, TestHostChipSlotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgChipComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('.zg-chip__button'));
    fixture.detectChanges();
  });

  describe('Slot Projection', () => {
    it('should project icon-left and icon-right into their own slots', () => {
      const hostFixture = TestBed.createComponent(TestHostChipSlotsComponent);
      hostFixture.detectChanges();

      const hostElement = hostFixture.nativeElement as HTMLElement;
      const iconLeftSlot = hostElement.querySelector('.zg-chip__icon-left');
      const iconRightSlot = hostElement.querySelector('.zg-chip__icon-right');
      const contentSlot = hostElement.querySelector('.zg-chip__content');
      const iconLeft = hostElement.querySelector('[data-testid="slot-icon-left"]');
      const iconRight = hostElement.querySelector('[data-testid="slot-icon-right"]');
      const label = hostElement.querySelector('[data-testid="slot-label"]');

      expect(iconLeftSlot?.contains(iconLeft as Node)).toBe(true);
      expect(iconRightSlot?.contains(iconRight as Node)).toBe(true);
      expect(contentSlot?.contains(label as Node)).toBe(true);
      expect(contentSlot?.contains(iconLeft as Node)).toBe(false);
      expect(contentSlot?.contains(iconRight as Node)).toBe(false);
    });
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a native button element', () => {
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.nativeElement.tagName).toBe('BUTTON');
    });

    it('should have default values', () => {
      expect(component.variant()).toBe('filled');
      expect(component.size()).toBe('md');
      expect(component.selected()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.text()).toBeUndefined();
    });

    it('should have type="button" attribute', () => {
      expect(buttonElement.nativeElement.getAttribute('type')).toBe('button');
    });
  });

  describe('Inputs', () => {
    it('should apply variant data attribute', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-variant')).toBe('outlined');
    });

    it('should apply size data attribute', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-size')).toBe('lg');
    });

    it('should apply selected data attribute when selected is true', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-selected')).toBe('true');
    });

    it('should apply disabled data attribute when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-disabled')).toBe('true');
    });

    it('should display text when text input is provided', () => {
      fixture.componentRef.setInput('text', 'Sports');
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-chip__content'));
      expect(content.nativeElement.textContent.trim()).toBe('Sports');
    });

    it('should apply all variant data attributes', () => {
      const variants: ('filled' | 'outlined' | 'ghost')[] = ['filled', 'outlined', 'ghost'];

      variants.forEach((variant) => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        const host = fixture.nativeElement as HTMLElement;
        expect(host.getAttribute('data-variant')).toBe(variant);
      });
    });

    it('should apply all size data attributes', () => {
      const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const host = fixture.nativeElement as HTMLElement;
        expect(host.getAttribute('data-size')).toBe(size);
      });
    });

    it('should apply selected data attribute when selected is true', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-selected')).toBe('true');
    });

    it('should apply disabled data attribute when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-disabled')).toBe('true');
    });
  });

  describe('Selected State', () => {
    it('should reflect selected input in aria-pressed attribute', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-pressed')).toBe('true');

      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-pressed')).toBe('false');
    });

    it('should emit selectedChange with toggled value on click', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');

      // Start unselected
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      // Click to select
      buttonElement.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith(true);

      // Simulate parent updating the input (two-way binding)
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      // Click to deselect
      buttonElement.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith(false);

      expect(emitSpy).toHaveBeenCalledTimes(2);
    });

    it('should have aria-pressed attribute reflecting selected state', () => {
      expect(buttonElement.nativeElement.getAttribute('aria-pressed')).toBe('false');

      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Click Event', () => {
    it('should emit clicked event when button is clicked', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');

      buttonElement.nativeElement.click();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit selectedChange event when button is clicked', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');

      // Start unselected
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      // Click to select
      buttonElement.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith(true);

      // Simulate parent updating via two-way binding
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      // Click to deselect
      buttonElement.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith(false);

      expect(emitSpy).toHaveBeenCalledTimes(2);
    });

    it('should not emit clicked event when button is disabled', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      buttonElement.nativeElement.click();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not emit selectedChange event when button is disabled', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      buttonElement.nativeElement.click();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not change selected state when disabled and clicked', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      fixture.detectChanges();

      // Should not emit
      expect(emitSpy).not.toHaveBeenCalled();
      // Should remain false
      expect(component.selected()).toBe(false);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should emit selectedChange on Enter key', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should emit selectedChange on Space key', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should emit clicked event on Enter key', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit selectedChange event on Space key', () => {
      const emitSpy = vi.spyOn(component.selectedChange, 'emit');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should not respond to keyboard when disabled', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not respond to other keys', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');

      const event = new KeyboardEvent('keydown', { key: 'a' });
      buttonElement.nativeElement.dispatchEvent(event);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-pressed attribute', () => {
      expect(buttonElement.nativeElement.hasAttribute('aria-pressed')).toBe(true);
    });

    it('should have aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should be disabled natively when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('ng-content Slots', () => {
    it('should render icon-left content', () => {
      const hostElement = fixture.nativeElement as HTMLElement;
      hostElement.innerHTML = `
        <svg icon-left data-testid="icon-left"></svg>
        Content
      `;
      fixture.detectChanges();

      const iconLeft = fixture.debugElement.query(By.css('.zg-chip__icon-left'));
      expect(iconLeft).toBeTruthy();
    });

    it('should render icon-right content', () => {
      const hostElement = fixture.nativeElement as HTMLElement;
      hostElement.innerHTML = `
        Content
        <svg icon-right data-testid="icon-right"></svg>
      `;
      fixture.detectChanges();

      const iconRight = fixture.debugElement.query(By.css('.zg-chip__icon-right'));
      expect(iconRight).toBeTruthy();
    });

    it('should render both icon-left and icon-right content', () => {
      const hostElement = fixture.nativeElement as HTMLElement;
      hostElement.innerHTML = `
        <svg icon-left data-testid="icon-left"></svg>
        Content
        <svg icon-right data-testid="icon-right"></svg>
      `;
      fixture.detectChanges();

      const iconLeft = fixture.debugElement.query(By.css('.zg-chip__icon-left'));
      const iconRight = fixture.debugElement.query(By.css('.zg-chip__icon-right'));

      expect(iconLeft).toBeTruthy();
      expect(iconRight).toBeTruthy();
    });
  });

  describe('Host Classes', () => {
    it('should compute correct host classes and data attributes', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;

      // Should have base class
      expect(host.classList.contains('zg-chip')).toBe(true);

      // Should have data attributes for styling
      expect(host.getAttribute('data-variant')).toBe('outlined');
      expect(host.getAttribute('data-size')).toBe('lg');
      expect(host.getAttribute('data-selected')).toBe('true');
    });

    it('should update data attributes when inputs change', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      let host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-variant')).toBe('filled');

      fixture.componentRef.setInput('variant', 'ghost');
      fixture.detectChanges();

      host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('data-variant')).toBe('ghost');
    });
  });
});
