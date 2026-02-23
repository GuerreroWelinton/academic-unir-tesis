import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgLuckyPickerComponent } from './lucky-picker.component';

describe('ZgLuckyPickerComponent', () => {
  let component: ZgLuckyPickerComponent;
  let fixture: ComponentFixture<ZgLuckyPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgLuckyPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgLuckyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, description and action label', () => {
    fixture.componentRef.setInput('title', 'Need a game?');
    fixture.componentRef.setInput('description', 'Let us choose one for you.');
    fixture.componentRef.setInput('actionLabel', 'Pick now');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.zg-lucky-picker__title'))
      .nativeElement as HTMLElement;
    const description = fixture.debugElement.query(By.css('.zg-lucky-picker__description'))
      .nativeElement as HTMLElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    expect(title.textContent?.trim()).toBe('Need a game?');
    expect(description.textContent?.trim()).toBe('Let us choose one for you.');
    expect(button.textContent?.trim()).toContain('Pick now');
  });

  it('should hide description when empty', () => {
    fixture.componentRef.setInput('description', '');
    fixture.detectChanges();

    const description = fixture.debugElement.query(By.css('.zg-lucky-picker__description'));
    expect(description).toBeNull();
  });

  it('should emit actionClicked when action is clicked', () => {
    const emitSpy = vi.spyOn(component.actionClicked, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit actionClicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.actionClicked, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    button.click();

    expect(button.disabled).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should set host data attributes', () => {
    fixture.componentRef.setInput('tone', 'highlight');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-tone')).toBe('highlight');
    expect(host.getAttribute('data-size')).toBe('lg');
  });
});
