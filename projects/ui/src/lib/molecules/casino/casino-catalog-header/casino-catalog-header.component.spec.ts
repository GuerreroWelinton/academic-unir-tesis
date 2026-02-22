import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoCatalogHeaderComponent } from './casino-catalog-header.component';

describe('ZgCasinoCatalogHeaderComponent', () => {
  let component: ZgCasinoCatalogHeaderComponent;
  let fixture: ComponentFixture<ZgCasinoCatalogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoCatalogHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoCatalogHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('breadcrumbs', [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino', href: '#casino' },
      { id: 'most-bet', label: 'Most bet' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and game count', () => {
    fixture.componentRef.setInput('title', 'Most bet games');
    fixture.componentRef.setInput('gamesCount', 3005);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.zg-casino-catalog-header__title'))
      .nativeElement as HTMLElement;
    const count = fixture.debugElement.query(By.css('.zg-casino-catalog-header__count'))
      .nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Most bet games');
    expect(count.textContent?.trim()).toBe('3,005 games');
  });

  it('should hide game count when gamesCount is null', () => {
    fixture.componentRef.setInput('gamesCount', null);
    fixture.detectChanges();

    const count = fixture.debugElement.query(By.css('.zg-casino-catalog-header__count'));
    expect(count).toBeNull();
  });

  it('should render breadcrumb when items are provided', () => {
    const breadcrumb = fixture.debugElement.query(By.css('zg-breadcrumb'));
    expect(breadcrumb).toBeTruthy();
  });

  it('should emit breadcrumbItemClicked on breadcrumb interaction', () => {
    const emitSpy = vi.spyOn(component.breadcrumbItemClicked, 'emit');
    const firstLink = fixture.debugElement.query(By.css('.zg-breadcrumb__link'))
      .nativeElement as HTMLAnchorElement;

    firstLink.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'home',
      }),
    );
  });
});
