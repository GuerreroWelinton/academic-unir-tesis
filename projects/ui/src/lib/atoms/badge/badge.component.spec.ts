import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZgBadgeComponent } from './badge.component';
import { By } from '@angular/platform-browser';

describe('ZgBadgeComponent', () => {
  let component: ZgBadgeComponent;
  let fixture: ComponentFixture<ZgBadgeComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgBadgeComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      expect(hostElement.getAttribute('data-variant')).toBe('primary');
      expect(hostElement.getAttribute('data-size')).toBe('md');
      expect(hostElement.getAttribute('data-shape')).toBe('default');
    });

    it('should render text content via text input', () => {
      fixture.componentRef.setInput('text', 'New');
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('New');
    });

    it('should render projected content via ng-content', () => {
      const testFixture = TestBed.createComponent(ZgBadgeComponent);
      testFixture.nativeElement.innerHTML = 'Custom Label';
      testFixture.detectChanges();

      expect(testFixture.nativeElement.textContent).toContain('Custom Label');
    });

    it('should have role="status" attribute', () => {
      expect(hostElement.getAttribute('role')).toBe('status');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant', () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('primary');
    });

    it('should apply success variant', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('success');
    });

    it('should apply error variant', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('error');
    });

    it('should apply warning variant', () => {
      fixture.componentRef.setInput('variant', 'warning');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('warning');
    });

    it('should apply info variant', () => {
      fixture.componentRef.setInput('variant', 'info');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('info');
    });

    it('should apply neutral variant', () => {
      fixture.componentRef.setInput('variant', 'neutral');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-variant')).toBe('neutral');
    });
  });

  describe('Sizes', () => {
    it('should apply small size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-size')).toBe('sm');
    });

    it('should apply medium size', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-size')).toBe('md');
    });

    it('should apply large size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('Shapes', () => {
    it('should apply default shape', () => {
      fixture.componentRef.setInput('shape', 'default');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-shape')).toBe('default');
    });

    it('should apply pill shape', () => {
      fixture.componentRef.setInput('shape', 'pill');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-shape')).toBe('pill');
    });

    it('should apply square shape', () => {
      fixture.componentRef.setInput('shape', 'square');
      fixture.detectChanges();

      expect(hostElement.getAttribute('data-shape')).toBe('square');
    });
  });

  describe('Dot mode', () => {
    it('should render as dot when dot input is true', () => {
      fixture.componentRef.setInput('dot', true);
      fixture.detectChanges();

      const dot = fixture.debugElement.query(By.css('.zg-badge__dot'));
      expect(dot).toBeTruthy();
      expect(hostElement.classList.contains('zg-badge--dot')).toBe(true);
    });

    it('should not render content in dot mode', () => {
      fixture.componentRef.setInput('dot', true);
      fixture.componentRef.setInput('text', 'Should not show');
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content).toBeNull();
    });

    it('should have aria-label on dot element', () => {
      fixture.componentRef.setInput('dot', true);
      fixture.detectChanges();

      const dot = fixture.debugElement.query(By.css('.zg-badge__dot'));
      expect(dot.nativeElement.getAttribute('aria-label')).toBe('notification indicator');
    });
  });

  describe('Removable', () => {
    it('should not render close button by default', () => {
      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      expect(closeButton).toBeNull();
    });

    it('should render close button when removable is true', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      expect(closeButton).toBeTruthy();
    });

    it('should emit removed event when close button is clicked', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      let emitted = false;
      component.removed.subscribe(() => {
        emitted = true;
      });

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      closeButton.nativeElement.click();

      expect(emitted).toBe(true);
    });

    it('should stop propagation when close button is clicked', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');

      closeButton.nativeElement.dispatchEvent(clickEvent);

      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should add removable class when removable is true', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      expect(hostElement.classList.contains('zg-badge--removable')).toBe(true);
    });

    it('should have aria-label on close button', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Remove badge');
    });
  });

  describe('Max number display', () => {
    it('should display text as-is when below max', () => {
      fixture.componentRef.setInput('text', '50');
      fixture.componentRef.setInput('max', 99);
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('50');
    });

    it('should display "max+" when number exceeds max', () => {
      fixture.componentRef.setInput('text', '150');
      fixture.componentRef.setInput('max', 99);
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('99+');
    });

    it('should display exact max value when number equals max', () => {
      fixture.componentRef.setInput('text', '99');
      fixture.componentRef.setInput('max', 99);
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('99');
    });

    it('should display non-numeric text as-is regardless of max', () => {
      fixture.componentRef.setInput('text', 'New');
      fixture.componentRef.setInput('max', 99);
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('New');
    });

    it('should ignore max when not defined', () => {
      fixture.componentRef.setInput('text', '500');
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.zg-badge__content'));
      expect(content.nativeElement.textContent.trim()).toBe('500');
    });
  });

  describe('Host classes', () => {
    it('should have base zg-badge class', () => {
      expect(hostElement.classList.contains('zg-badge')).toBe(true);
    });

    it('should add dot class when in dot mode', () => {
      fixture.componentRef.setInput('dot', true);
      fixture.detectChanges();

      expect(hostElement.classList.contains('zg-badge--dot')).toBe(true);
    });

    it('should add removable class when removable', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      expect(hostElement.classList.contains('zg-badge--removable')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have role="status" for screen readers', () => {
      expect(hostElement.getAttribute('role')).toBe('status');
    });

    it('should have aria-label on close button', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      expect(closeButton.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-hidden on close button svg', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const svg = fixture.debugElement.query(By.css('.zg-badge__close svg'));
      expect(svg.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have type="button" on close button', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.zg-badge__close'));
      expect(closeButton.nativeElement.getAttribute('type')).toBe('button');
    });
  });
});
