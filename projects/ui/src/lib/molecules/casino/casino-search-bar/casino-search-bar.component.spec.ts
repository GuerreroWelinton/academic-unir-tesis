import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoSearchBarComponent } from './casino-search-bar.component';

describe('ZgCasinoSearchBarComponent', () => {
  let component: ZgCasinoSearchBarComponent;
  let fixture: ComponentFixture<ZgCasinoSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoSearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render placeholder from input', () => {
    fixture.componentRef.setInput('placeholder', 'Search casino games');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    expect(input.placeholder).toBe('Search casino games');
  });

  it('should render providers button label', () => {
    fixture.componentRef.setInput('providersLabel', 'PROVIDERS');
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('.zg-casino-search-bar__providers-button button'),
    ).nativeElement as HTMLButtonElement;

    expect(button.textContent).toContain('PROVIDERS');
  });

  it('should emit queryChange and changed when typing', () => {
    const queryChangeSpy = vi.spyOn(component.queryChange, 'emit');
    const changedSpy = vi.spyOn(component.changed, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'aviator';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(queryChangeSpy).toHaveBeenCalledWith('aviator');
    expect(changedSpy).toHaveBeenCalledWith('aviator');
  });

  it('should emit searched on submit', () => {
    const searchedSpy = vi.spyOn(component.searched, 'emit');
    fixture.componentRef.setInput('query', '  blackjack  ');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(searchedSpy).toHaveBeenCalledWith('blackjack');
  });

  it('should not emit searched when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('query', 'roulette');
    fixture.detectChanges();

    const searchedSpy = vi.spyOn(component.searched, 'emit');
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(searchedSpy).not.toHaveBeenCalled();
  });

  it('should emit providersClicked when providers button is clicked', () => {
    const providersSpy = vi.spyOn(component.providersClicked, 'emit');
    const button = fixture.debugElement.query(
      By.css('.zg-casino-search-bar__providers-button button'),
    ).nativeElement as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(providersSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit queryChange and cleared when clear button is clicked', () => {
    fixture.componentRef.setInput('query', 'slots');
    fixture.detectChanges();

    const queryChangeSpy = vi.spyOn(component.queryChange, 'emit');
    const clearedSpy = vi.spyOn(component.cleared, 'emit');
    const clearButton = fixture.debugElement.query(By.css('.zg-input__clear'))
      .nativeElement as HTMLButtonElement;

    clearButton.click();
    fixture.detectChanges();

    expect(queryChangeSpy).toHaveBeenCalledWith('');
    expect(clearedSpy).toHaveBeenCalledTimes(1);
  });
});
