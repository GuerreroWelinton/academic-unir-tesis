import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgHorizontalListLayoutComponent } from '../../../molecules/shared/horizontal-list-layout/horizontal-list-layout.component';
import { ZgCasinoRankedGamesCarouselSectionComponent } from './casino-ranked-games-carousel-section.component';

describe('ZgCasinoRankedGamesCarouselSectionComponent', () => {
  let component: ZgCasinoRankedGamesCarouselSectionComponent;
  let fixture: ComponentFixture<ZgCasinoRankedGamesCarouselSectionComponent>;

  const items = [
    {
      id: 'jacks-or-better',
      title: 'Jacks or Better',
      provider: 'Genii',
      imageUrl: 'https://placehold.co/260x360?text=Jacks+or+Better',
      rank: 1,
    },
    {
      id: 'bonus-poker',
      title: 'Bonus Poker',
      provider: 'Genii',
      imageUrl: 'https://placehold.co/260x360?text=Bonus+Poker',
      rank: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoRankedGamesCarouselSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoRankedGamesCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ranks from provided data', () => {
    const rankNodes = fixture.debugElement.queryAll(
      By.css('.zg-casino-ranked-games-carousel-section__rank'),
    );
    expect(rankNodes[0].nativeElement.textContent.trim()).toBe('1');
    expect(rankNodes[1].nativeElement.textContent.trim()).toBe('2');
  });

  it('should emit section actions', () => {
    const prevSpy = vi.spyOn(component.previousClicked, 'emit');
    const nextSpy = vi.spyOn(component.nextClicked, 'emit');

    emitScrollState({ canScrollPrev: true, canScrollNext: true });
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('[zg-section-actions-prev] button'));
    const nextButton = fixture.debugElement.query(By.css('[zg-section-actions-next] button'));
    prevButton.nativeElement.click();
    nextButton.nativeElement.click();

    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit play and favorite events', () => {
    const playSpy = vi.spyOn(component.playRequested, 'emit');
    const favoriteSpy = vi.spyOn(component.favoriteRequested, 'emit');

    const playButton = fixture.debugElement.query(By.css('.zg-game-card__play-button'));
    const favoriteButton = fixture.debugElement.query(By.css('.zg-game-card__favorite'));
    playButton.nativeElement.click();
    favoriteButton.nativeElement.click();

    expect(playSpy).toHaveBeenCalledWith(items[0]);
    expect(favoriteSpy).toHaveBeenCalledWith(items[0]);
  });

  it('should disable nav buttons when scroll state does not allow navigation', () => {
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

  it('should fallback actions size to title size and allow override', () => {
    fixture.componentRef.setInput('titleSize', 'sm');
    fixture.componentRef.setInput('actionsSize', null);
    fixture.detectChanges();

    let actionButtons = fixture.debugElement.queryAll(
      By.css('[zg-section-actions-prev], [zg-section-actions-next]'),
    );
    expect(actionButtons[0].nativeElement.getAttribute('data-size')).toBe('sm');
    expect(actionButtons[1].nativeElement.getAttribute('data-size')).toBe('sm');

    fixture.componentRef.setInput('actionsSize', 'lg');
    fixture.detectChanges();

    actionButtons = fixture.debugElement.queryAll(
      By.css('[zg-section-actions-prev], [zg-section-actions-next]'),
    );
    expect(actionButtons[0].nativeElement.getAttribute('data-size')).toBe('lg');
    expect(actionButtons[1].nativeElement.getAttribute('data-size')).toBe('lg');
  });

  function emitScrollState(state: { canScrollPrev: boolean; canScrollNext: boolean }): void {
    const layoutDebug = fixture.debugElement.query(By.directive(ZgHorizontalListLayoutComponent));
    const layout = layoutDebug.componentInstance as ZgHorizontalListLayoutComponent;
    layout.scrollStateChange.emit(state);
  }
});
