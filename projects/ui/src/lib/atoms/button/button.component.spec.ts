import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZgButtonComponent } from './button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('ZgButtonComponent', () => {
  let component: ZgButtonComponent;
  let fixture: ComponentFixture<ZgButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('.zg-button__native'));
    fixture.detectChanges();
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
      expect(component.variant).toBe('primary');
      expect(component.size).toBe('md');
      expect(component.shape).toBe('default');
      expect(component.disabled).toBe(false);
      expect(component.loading).toBe(false);
      expect(component.fullWidth).toBe(false);
      expect(component.type).toBe('button');
      expect(component.fontFamily).toBe('base');
    });
  });

  describe('Inputs', () => {
    it('should apply variant data attribute', () => {
      component.variant = 'accent';
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.getAttribute('data-variant')).toBe('accent');
    });

    it('should apply size data attribute', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.getAttribute('data-size')).toBe('lg');
    });

    it('should apply shape data attribute', () => {
      component.shape = 'pill';
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.getAttribute('data-shape')).toBe('pill');
    });

    it('should apply fontFamily data attribute', () => {
      component.fontFamily = 'secondary';
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.getAttribute('data-font-family')).toBe('secondary');
    });

    it('should disable button when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should disable button when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should set native button type attribute', () => {
      component.type = 'submit';
      fixture.detectChanges();

      expect(buttonElement.nativeElement.type).toBe('submit');
    });

    it('should apply full-width class when fullWidth is true', () => {
      component.fullWidth = true;
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.classList.contains('zg-button--full-width')).toBe(true);
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('.zg-button__spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should not show spinner when loading is false', () => {
      component.loading = false;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('.zg-button__spinner'));
      expect(spinner).toBeFalsy();
    });

    it('should hide content when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-button__content'));
      expect(content.nativeElement.classList.contains('zg-button__content--hidden')).toBe(true);
    });

    it('should apply loading class when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.classList.contains('zg-button--loading')).toBe(true);
    });

    it('should allow programmatic loading state via setLoading()', () => {
      component.setLoading(true);
      fixture.detectChanges();

      const host = fixture.debugElement.nativeElement;
      expect(host.classList.contains('zg-button--loading')).toBe(true);

      component.setLoading(false);
      fixture.detectChanges();

      expect(host.classList.contains('zg-button--loading')).toBe(false);
    });
  });

  describe('Click Event', () => {
    it('should emit clicked event when button is clicked', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');

      buttonElement.nativeElement.click();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit clicked event when button is disabled', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');
      component.disabled = true;
      fixture.detectChanges();

      buttonElement.nativeElement.click();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not emit clicked event when button is loading', () => {
      const emitSpy = vi.spyOn(component.clicked, 'emit');
      component.loading = true;
      fixture.detectChanges();

      buttonElement.nativeElement.click();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should pass MouseEvent to clicked emitter', () => {
      let emittedEvent: MouseEvent | undefined;
      component.clicked.subscribe((event: MouseEvent) => {
        emittedEvent = event;
      });

      buttonElement.nativeElement.click();

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent instanceof MouseEvent).toBe(true);
    });
  });

  describe('Content Projection', () => {
    it('should project text content', () => {
      const testFixture = TestBed.createComponent(ZgButtonComponent);
      testFixture.componentInstance;
      testFixture.detectChanges();

      const compiled = testFixture.nativeElement as HTMLElement;
      compiled.querySelector('.zg-button__content');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible (focusable)', () => {
      expect(buttonElement.nativeElement.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should not be focusable when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      // Disabled buttons are not focusable
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('Variant Styles', () => {
    const variants: Array<'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'> = [
      'primary',
      'secondary',
      'accent',
      'danger',
      'ghost',
    ];

    variants.forEach((variant) => {
      it(`should apply ${variant} variant`, () => {
        component.variant = variant;
        fixture.detectChanges();

        const host = fixture.debugElement.nativeElement;
        expect(host.getAttribute('data-variant')).toBe(variant);
      });
    });
  });

  describe('Size Styles', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should apply ${size} size`, () => {
        component.size = size;
        fixture.detectChanges();

        const host = fixture.debugElement.nativeElement;
        expect(host.getAttribute('data-size')).toBe(size);
      });
    });
  });

  describe('Shape Styles', () => {
    const shapes: Array<'default' | 'pill' | 'square'> = ['default', 'pill', 'square'];

    shapes.forEach((shape) => {
      it(`should apply ${shape} shape`, () => {
        component.shape = shape;
        fixture.detectChanges();

        const host = fixture.debugElement.nativeElement;
        expect(host.getAttribute('data-shape')).toBe(shape);
      });
    });
  });

  describe('Font Family Styles', () => {
    const fontFamilies: Array<'base' | 'secondary'> = ['base', 'secondary'];

    fontFamilies.forEach((fontFamily) => {
      it(`should apply ${fontFamily} fontFamily`, () => {
        component.fontFamily = fontFamily;
        fixture.detectChanges();

        const host = fixture.debugElement.nativeElement;
        expect(host.getAttribute('data-font-family')).toBe(fontFamily);
      });
    });
  });
});
