import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgSectionTitleComponent } from './section-title.component';

describe('ZgSectionTitleComponent', () => {
  let fixture: ComponentFixture<ZgSectionTitleComponent>;
  let component: ZgSectionTitleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgSectionTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Los mas apostados');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const text = fixture.debugElement.query(By.css('.zg-section-title__text'));
    expect(text.nativeElement.textContent.trim()).toBe('Los mas apostados');
  });

  it('should render accent when showAccent is true', () => {
    fixture.componentRef.setInput('showAccent', true);
    fixture.detectChanges();

    const accent = fixture.debugElement.query(By.css('.zg-section-title__accent'));
    expect(accent).toBeTruthy();
  });

  it('should not render accent when showAccent is false', () => {
    fixture.componentRef.setInput('showAccent', false);
    fixture.detectChanges();

    const accent = fixture.debugElement.query(By.css('.zg-section-title__accent'));
    expect(accent).toBeNull();
  });

  it('should apply fontFamily variant as data attribute', () => {
    fixture.componentRef.setInput('fontFamily', 'base');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-font-family')).toBe('base');
  });
});
