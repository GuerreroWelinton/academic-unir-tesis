import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { type SiteHeaderNavItem } from '@zgames/ui';
import { vi } from 'vitest';
import { routes } from '../../app.routes';
import { CasinoHomePageComponent } from './casino-home-page.component';

describe('CasinoHomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should render casino home content on default route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', CasinoHomePageComponent);

    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('CASINO');
    expect(text).toContain('Most bet');
  });

  it('should render category tabs and update selected category', async () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onCategoryChanged('table-cards');
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('table-cards');
    expect(component.categoryItems().length).toBeGreaterThan(1);
  });

  it('should filter games by search query', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onSearchChanged('aviator');
    fixture.detectChanges();

    expect(
      component.mostBetGames().every((game) => game.title.toLowerCase().includes('aviator')),
    ).toBe(true);
  });

  it('should navigate on enabled header nav item and ignore disabled item', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onNavItemClicked({
      id: 'sports',
      label: 'SPORTS',
      disabled: true,
    } as SiteHeaderNavItem);
    expect(navigateSpy).not.toHaveBeenCalled();

    component.onNavItemClicked({ id: 'casino', label: 'CASINO' } as SiteHeaderNavItem);
    expect(navigateSpy).toHaveBeenCalledWith('/casino');
  });

  it('should navigate to /casino when brand is clicked', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onBrandClicked();

    expect(navigateSpy).toHaveBeenCalledWith('/casino');
  });

  it('should ignore header nav item without route', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onNavItemClicked({ id: 'unknown', label: 'UNKNOWN' } as SiteHeaderNavItem);

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should navigate to catalog routes from section actions', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onMostBetViewAllClicked();
    component.onMostPlayedViewAllClicked();
    component.onAllGamesViewAllClicked();

    expect(navigateSpy).toHaveBeenCalledWith('/casino/most-bet');
    expect(navigateSpy).toHaveBeenCalledWith('/casino/most-played-games');
    expect(navigateSpy).toHaveBeenCalledWith('/casino/all-games');
  });

  it('should compute ranked games and keep no-op handlers callable', () => {
    const fixture = TestBed.createComponent(CasinoHomePageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.rankedGames()[0]?.rank).toBe(1);

    component.onProvidersClicked();
    component.onProviderSelected(component.providerItems[0]);
    component.onLuckyPickerClicked();
    component.onLoginClicked();
    component.onRegisterClicked();
    component.onGamePlayRequested(component.mostBetGames()[0]);
    component.onGameFavoriteRequested(component.mostBetGames()[0]);
  });
});
