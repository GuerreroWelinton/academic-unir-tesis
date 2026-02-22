import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgHorizontalListLayoutComponent } from '../../../molecules/shared/horizontal-list-layout/horizontal-list-layout.component';
import { ZgCasinoGamesCarouselSectionComponent } from './casino-games-carousel-section.component';

describe('ZgCasinoGamesCarouselSectionComponent', () => {
  let component: ZgCasinoGamesCarouselSectionComponent;
  let fixture: ComponentFixture<ZgCasinoGamesCarouselSectionComponent>;

  const items = [
    {
      id: 'blackjack-8',
      title: 'Blackjack 8',
      provider: 'Lucky Streak',
      imageUrl: 'https://placehold.co/260x360?text=Blackjack+8',
    },
    {
      id: 'bonus-poker',
      title: 'Bonus Poker',
      provider: 'Genii',
      imageUrl: 'https://placehold.co/260x360?text=Bonus+Poker',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGamesCarouselSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoGamesCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and cards', () => {
    fixture.componentRef.setInput('title', 'Most bet games');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.zg-section-title__text'));
    const cards = fixture.debugElement.queryAll(By.css('zg-casino-game-card'));

    expect(title.nativeElement.textContent.trim()).toBe('Most bet games');
    expect(cards.length).toBe(2);
  });

  it('should emit section action outputs when buttons are clicked', () => {
    const viewAllSpy = vi.spyOn(component.viewAllClicked, 'emit');
    const prevSpy = vi.spyOn(component.previousClicked, 'emit');
    const nextSpy = vi.spyOn(component.nextClicked, 'emit');

    emitScrollState({ canScrollPrev: true, canScrollNext: true });
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();
    buttons[2].nativeElement.click();

    expect(viewAllSpy).toHaveBeenCalledTimes(1);
    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit play and favorite outputs with clicked item', () => {
    const playSpy = vi.spyOn(component.playRequested, 'emit');
    const favoriteSpy = vi.spyOn(component.favoriteRequested, 'emit');

    const playButton = fixture.debugElement.query(By.css('.zg-game-card__play-button'));
    const favoriteButton = fixture.debugElement.query(By.css('.zg-game-card__favorite'));

    playButton.nativeElement.click();
    favoriteButton.nativeElement.click();

    expect(playSpy).toHaveBeenCalledWith(items[0]);
    expect(favoriteSpy).toHaveBeenCalledWith(items[0]);
  });

  it('should disable nav buttons when no scroll is available', () => {
    emitScrollState({ canScrollPrev: false, canScrollNext: false });
    fixture.detectChanges();

    const navButtons = fixture.debugElement.queryAll(
      By.css(
        '[zg-section-actions-prev] .zg-button__native, [zg-section-actions-next] .zg-button__native',
      ),
    );
    expect(navButtons[0].nativeElement.disabled).toBe(true);
    expect(navButtons[1].nativeElement.disabled).toBe(true);
  });

  it('should use titleSize as fallback for actions size and allow override', () => {
    fixture.componentRef.setInput('titleSize', 'sm');
    fixture.componentRef.setInput('actionsSize', null);
    fixture.detectChanges();

    let actionButtons = fixture.debugElement.queryAll(
      By.css('[zg-section-actions-all], [zg-section-actions-prev], [zg-section-actions-next]'),
    );
    expect(actionButtons[0].nativeElement.getAttribute('data-size')).toBe('sm');
    expect(actionButtons[1].nativeElement.getAttribute('data-size')).toBe('sm');
    expect(actionButtons[2].nativeElement.getAttribute('data-size')).toBe('sm');

    fixture.componentRef.setInput('actionsSize', 'lg');
    fixture.detectChanges();

    actionButtons = fixture.debugElement.queryAll(
      By.css('[zg-section-actions-all], [zg-section-actions-prev], [zg-section-actions-next]'),
    );
    expect(actionButtons[0].nativeElement.getAttribute('data-size')).toBe('lg');
    expect(actionButtons[1].nativeElement.getAttribute('data-size')).toBe('lg');
    expect(actionButtons[2].nativeElement.getAttribute('data-size')).toBe('lg');
  });

  function emitScrollState(state: { canScrollPrev: boolean; canScrollNext: boolean }): void {
    const layoutDebug = fixture.debugElement.query(By.directive(ZgHorizontalListLayoutComponent));
    const layout = layoutDebug.componentInstance as ZgHorizontalListLayoutComponent;
    layout.scrollStateChange.emit(state);
  }
});
