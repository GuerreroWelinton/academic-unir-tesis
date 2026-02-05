import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default props', () => {
    expect(component.label).toBe('Button');
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.disabled).toBe(false);
  });

  it('should emit clicked event when clicked', () => {
    let emittedEvent: MouseEvent | undefined;
    component.clicked.subscribe((event: MouseEvent) => {
      emittedEvent = event;
    });

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emittedEvent).toBeDefined();
  });

  it('should not emit clicked event when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    let emitted = false;
    component.clicked.subscribe(() => {
      emitted = true;
    });

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toBe(false);
  });

  it('should apply correct variant class', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('zg-button--secondary')).toBe(true);
  });

  it('should apply correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('zg-button--lg')).toBe(true);
  });
});
