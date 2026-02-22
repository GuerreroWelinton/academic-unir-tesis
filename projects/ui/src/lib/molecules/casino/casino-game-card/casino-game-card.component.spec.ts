import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoGameCardComponent } from './casino-game-card.component';

describe('ZgCasinoGameCardComponent', () => {
  let component: ZgCasinoGameCardComponent;
  let fixture: ComponentFixture<ZgCasinoGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoGameCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Aviator');
    fixture.componentRef.setInput('provider', 'Spribe');
    fixture.componentRef.setInput(
      'imageUrl',
      'https://api-casino.zgames.tech/images/aleaplay/vertical/aviator.webp',
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and provider', () => {
    const title = fixture.debugElement.query(By.css('.zg-game-card__title'))
      .nativeElement as HTMLElement;
    const provider = fixture.debugElement.query(By.css('.zg-game-card__provider'))
      .nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Aviator');
    expect(provider.textContent?.trim()).toBe('Spribe');
  });

  it('should not render provider when provider is empty', () => {
    fixture.componentRef.setInput('provider', '');
    fixture.detectChanges();

    const provider = fixture.debugElement.query(By.css('.zg-game-card__provider'));
    expect(provider).toBeNull();
  });

  it('should emit playClicked when play button is clicked', () => {
    const emitSpy = vi.spyOn(component.playClicked, 'emit');
    const button = fixture.debugElement.query(By.css('.zg-game-card__play-button'))
      .nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit favoriteClicked when favorite button is clicked', () => {
    const emitSpy = vi.spyOn(component.favoriteClicked, 'emit');
    const button = fixture.debugElement.query(By.css('.zg-game-card__favorite'))
      .nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit events when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const playSpy = vi.spyOn(component.playClicked, 'emit');
    const favSpy = vi.spyOn(component.favoriteClicked, 'emit');

    const playButton = fixture.debugElement.query(By.css('.zg-game-card__play-button'))
      .nativeElement as HTMLButtonElement;
    const favoriteButton = fixture.debugElement.query(By.css('.zg-game-card__favorite'))
      .nativeElement as HTMLButtonElement;

    playButton.click();
    favoriteButton.click();

    expect(playSpy).not.toHaveBeenCalled();
    expect(favSpy).not.toHaveBeenCalled();
  });

  it('should hide favorite button when showFavorite is false', () => {
    fixture.componentRef.setInput('showFavorite', false);
    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.query(By.css('.zg-game-card__favorite'));
    expect(favoriteButton).toBeNull();
  });

  it('should set square aspect ratio data attribute', () => {
    fixture.componentRef.setInput('aspectRatio', 'square');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-aspect-ratio')).toBe('square');
  });

  it('should fallback image alt to title when imageAlt is not provided', () => {
    fixture.componentRef.setInput('imageAlt', '');
    fixture.componentRef.setInput('title', 'Aviator');
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('.zg-game-card__image'))
      .nativeElement as HTMLImageElement;
    expect(image.getAttribute('alt')).toBe('Aviator');
  });

  it('should fallback image alt to generic value when imageAlt and title are empty', () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('imageAlt', '');
    fixture.componentRef.setInput('imageUrl', 'https://example.com/game.webp');
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('.zg-game-card__image'))
      .nativeElement as HTMLImageElement;
    expect(image.getAttribute('alt')).toBe('Game cover');
  });

  it('should render image placeholder when imageUrl is empty', () => {
    fixture.componentRef.setInput('imageUrl', '');
    fixture.detectChanges();

    const placeholder = fixture.debugElement.query(By.css('.zg-game-card__image-placeholder'));
    const image = fixture.debugElement.query(By.css('.zg-game-card__image'));

    expect(placeholder).toBeTruthy();
    expect(image).toBeNull();
  });

  it('should show fallback icons when no icon slots are projected', () => {
    const fallbacks = fixture.debugElement.queryAll(By.css('.zg-game-card__icon-fallback'));
    const favoriteFallback = fallbacks[0];
    const favoriteFallbackSvg = fixture.debugElement.query(
      By.css('.zg-game-card__favorite .zg-game-card__icon-fallback svg'),
    );

    const playFallback = fixture.debugElement.query(
      By.css('.zg-game-card__play-button .zg-game-card__icon-fallback'),
    );

    expect(fallbacks.length).toBe(1);
    expect(favoriteFallback).toBeTruthy();
    expect(favoriteFallbackSvg).toBeTruthy();
    expect(playFallback).toBeNull();
  });

  it('should stop propagation and not emit playClicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.playClicked, 'emit');
    const playButtonDebug = fixture.debugElement.query(By.css('.zg-game-card__play-button'));
    const event = {
      stopPropagation: vi.fn(),
    };

    playButtonDebug.triggerEventHandler('click', event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should stop propagation and not emit favoriteClicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.favoriteClicked, 'emit');
    const favoriteButtonDebug = fixture.debugElement.query(By.css('.zg-game-card__favorite'));
    const event = {
      stopPropagation: vi.fn(),
    };

    favoriteButtonDebug.triggerEventHandler('click', event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
