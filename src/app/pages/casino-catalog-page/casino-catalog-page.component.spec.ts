import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { routes } from '../../app.routes';
import { CasinoCatalogPageComponent } from './casino-catalog-page.component';

describe('CasinoCatalogPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should render All games by default route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/casino/all-games', CasinoCatalogPageComponent);

    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('All games');
  });

  it('should render route-specific title for /casino/most-bet', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/casino/most-bet', CasinoCatalogPageComponent);

    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('Most bet games');
  });

  it('should render route-specific title for /casino/most-played-games', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/casino/most-played-games', CasinoCatalogPageComponent);

    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('Most played games');
  });

  it('should render games in chunks and load more on demand', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/casino/all-games', CasinoCatalogPageComponent);
    harness.detectChanges();

    const countCards = () =>
      harness.routeNativeElement?.querySelectorAll('zg-casino-game-card').length ?? 0;

    expect(countCards()).toBe(24);
    component.loadMore();
    harness.detectChanges();
    expect(countCards()).toBe(48);
  });

  it('should navigate to /casino when brand is clicked', () => {
    const fixture = TestBed.createComponent(CasinoCatalogPageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onBrandClicked();

    expect(navigateSpy).toHaveBeenCalledWith('/casino');
  });

  it('should not navigate when breadcrumb item is catalog', () => {
    const fixture = TestBed.createComponent(CasinoCatalogPageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onBreadcrumbItemClicked({ id: 'catalog' });

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should navigate to /casino when breadcrumb item is not catalog', () => {
    const fixture = TestBed.createComponent(CasinoCatalogPageComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    component.onBreadcrumbItemClicked({ id: 'home' });

    expect(navigateSpy).toHaveBeenCalledWith('/casino');
  });

  it('should keep visibleCount when loadMore is called without more games', () => {
    const fixture = TestBed.createComponent(CasinoCatalogPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.visibleCount.set(component.filteredGames().length);
    const before = component.visibleCount();
    component.loadMore();

    expect(component.visibleCount()).toBe(before);
  });
});
