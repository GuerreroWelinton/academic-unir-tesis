import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoGameCardComponent } from '../../../molecules/casino/casino-game-card/casino-game-card.component';
import { ZgCasinoGamesGridSectionComponent } from './casino-games-grid-section.component';

@Component({
  standalone: true,
  imports: [ZgCasinoGamesGridSectionComponent, ZgCasinoGameCardComponent],
  template: `
    <zg-casino-games-grid-section
      [breadcrumbs]="[
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'casino', label: 'Casino', href: '#casino' },
        { id: 'most-bet', label: 'Most bet' },
      ]"
      title="All games"
      [gamesCount]="3005"
    >
      <zg-casino-game-card
        title="Carnival Treasure"
        provider="SA Gaming"
        imageUrl="https://placehold.co/260x360?text=Carnival+Treasure"
        aspectRatio="square"
      ></zg-casino-game-card>
      <zg-casino-game-card
        title="Roulette D"
        provider="SA Gaming"
        imageUrl="https://placehold.co/260x360?text=Roulette+D"
        aspectRatio="square"
      ></zg-casino-game-card>
    </zg-casino-games-grid-section>
  `,
})
class ProjectedCardsHostComponent {}

describe('ZgCasinoGamesGridSectionComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGamesGridSectionComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ZgCasinoGamesGridSectionComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render catalog title and projected cards', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectedCardsHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectedCardsHostComponent);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.zg-casino-catalog-header__title'));
    const cards = fixture.debugElement.queryAll(By.css('zg-casino-game-card'));

    expect(title.nativeElement.textContent.trim()).toBe('All games');
    expect(cards.length).toBe(2);
  });

  it('should render empty state when enabled', async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGamesGridSectionComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ZgCasinoGamesGridSectionComponent);
    fixture.componentRef.setInput('showEmptyState', true);
    fixture.componentRef.setInput('emptyStateLabel', 'No results found');
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.zg-casino-games-grid-section__empty'));
    expect(emptyState.nativeElement.textContent.trim()).toBe('No results found');
  });

  it('should emit breadcrumbItemClicked from catalog header interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGamesGridSectionComponent],
    }).compileComponents();

    const fixture: ComponentFixture<ZgCasinoGamesGridSectionComponent> = TestBed.createComponent(
      ZgCasinoGamesGridSectionComponent,
    );
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.breadcrumbItemClicked, 'emit');

    fixture.componentRef.setInput('breadcrumbs', [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino' },
    ]);
    fixture.detectChanges();

    const firstBreadcrumbLink = fixture.debugElement.query(By.css('.zg-breadcrumb__link'));
    firstBreadcrumbLink.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'home',
      }),
    );
  });

  it('should apply custom card min width via css variable', async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoGamesGridSectionComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ZgCasinoGamesGridSectionComponent);
    fixture.componentRef.setInput('cardMinWidth', 180);
    fixture.detectChanges();

    const hostElement = fixture.debugElement.nativeElement as HTMLElement;
    expect(
      hostElement.style.getPropertyValue('--zg-casino-games-grid-section-card-min-width'),
    ).toBe('180px');
  });
});
