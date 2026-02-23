import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgSiteHeaderComponent } from './site-header.component';

describe('ZgSiteHeaderComponent', () => {
  let component: ZgSiteHeaderComponent;
  let fixture: ComponentFixture<ZgSiteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgSiteHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgSiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('navItems', [
      { id: 'sports', label: 'Sports', href: '#sports' },
      { id: 'casino', label: 'Casino', href: '#casino', active: true },
      { id: 'live-casino', label: 'Live Casino', disabled: true },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render provided nav items', () => {
    const links = fixture.debugElement.queryAll(
      By.css('.zg-site-header__nav-link, .zg-site-header__nav-button'),
    );
    expect(links.length).toBe(3);
  });

  it('should render logo image when logoUrl is provided', () => {
    fixture.componentRef.setInput('logoUrl', 'https://placehold.co/280x80?text=SORTI365');
    fixture.componentRef.setInput('logoAlt', 'Sorti365 logo');
    fixture.detectChanges();

    const logo = fixture.debugElement.query(By.css('.zg-site-header__brand-logo'))
      .nativeElement as HTMLImageElement;

    expect(logo).toBeTruthy();
    expect(logo.alt).toBe('Sorti365 logo');
  });

  it('should render brand label text when logoUrl is not provided', () => {
    fixture.componentRef.setInput('logoUrl', null);
    fixture.componentRef.setInput('brandLabel', 'Sorti365');
    fixture.detectChanges();

    const brand = fixture.debugElement.query(By.css('.zg-site-header__brand'))
      .nativeElement as HTMLElement;

    expect(brand.textContent).toContain('Sorti365');
  });

  it('should emit navItemClicked when active link is clicked', () => {
    const emitSpy = vi.spyOn(component.navItemClicked, 'emit');
    const casinoLink = fixture.debugElement.query(
      By.css('.zg-site-header__nav-link[data-active="true"]'),
    ).nativeElement as HTMLAnchorElement;

    casinoLink.click();

    expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({ id: 'casino' }));
  });

  it('should not emit navItemClicked for disabled item', () => {
    const emitSpy = vi.spyOn(component.navItemClicked, 'emit');
    const disabledButton = fixture.debugElement.query(
      By.css('.zg-site-header__nav-button[disabled]'),
    ).nativeElement as HTMLButtonElement;

    disabledButton.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit login and register events', () => {
    const loginSpy = vi.spyOn(component.loginClicked, 'emit');
    const registerSpy = vi.spyOn(component.registerClicked, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('.zg-site-header__action'));

    (buttons[0].nativeElement as HTMLButtonElement).click();
    (buttons[1].nativeElement as HTMLButtonElement).click();

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(registerSpy).toHaveBeenCalledTimes(1);
  });
});
