import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoHomeHeroComponent } from './casino-home-hero.component';

describe('ZgCasinoHomeHeroComponent', () => {
  let component: ZgCasinoHomeHeroComponent;
  let fixture: ComponentFixture<ZgCasinoHomeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoHomeHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoHomeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text inputs', () => {
    fixture.componentRef.setInput('title', 'CASINO');
    fixture.componentRef.setInput('description', 'Luck and prizes await.');
    fixture.componentRef.setInput('highlightText', 'Start now');
    fixture.componentRef.setInput('caption', 'Luck follows you');
    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.zg-casino-home-hero__title'))
        .nativeElement.textContent.trim(),
    ).toBe('CASINO');
    expect(
      fixture.debugElement
        .query(By.css('.zg-casino-home-hero__description'))
        .nativeElement.textContent.trim(),
    ).toBe('Luck and prizes await.');
    expect(
      fixture.debugElement
        .query(By.css('.zg-casino-home-hero__highlight'))
        .nativeElement.textContent.trim(),
    ).toBe('Start now');
  });

  it('should apply aria label and image alts', () => {
    fixture.componentRef.setInput('ariaLabel', 'Casino landing hero');
    fixture.componentRef.setInput('backgroundImageAlt', 'Green casino hall');
    fixture.componentRef.setInput('characterImageAlt', 'Main campaign characters');
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement as HTMLElement;
    const images = fixture.debugElement.queryAll(By.css('img'));

    expect(host.getAttribute('aria-label')).toBe('Casino landing hero');
    expect(images[0].nativeElement.getAttribute('alt')).toBe('Green casino hall');
    expect(images[1].nativeElement.getAttribute('alt')).toBe('Main campaign characters');
  });

  it('should disable zoom animation class when zoomEnabled is false', () => {
    fixture.componentRef.setInput('zoomEnabled', false);
    fixture.detectChanges();

    const characterImage = fixture.debugElement.query(By.css('.zg-casino-home-hero__character'))
      .nativeElement as HTMLElement;
    expect(characterImage.classList.contains('zg-casino-home-hero__character--zoom')).toBe(false);
  });

  it('should expose custom style variables from inputs', () => {
    fixture.componentRef.setInput('overlayOpacity', 0.72);
    fixture.componentRef.setInput('zoomDurationMs', 6000);
    fixture.componentRef.setInput('zoomScaleMin', 0.98);
    fixture.componentRef.setInput('zoomScaleMax', 1.08);
    fixture.componentRef.setInput('minHeight', '28rem');
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement as HTMLElement;

    expect(host.style.getPropertyValue('--zg-casino-home-hero-overlay-opacity')).toBe('0.72');
    expect(host.style.getPropertyValue('--zg-casino-home-hero-zoom-duration')).toBe('6000ms');
    expect(host.style.getPropertyValue('--zg-casino-home-hero-zoom-scale-min')).toBe('0.98');
    expect(host.style.getPropertyValue('--zg-casino-home-hero-zoom-scale-max')).toBe('1.08');
    expect(host.style.getPropertyValue('--zg-casino-home-hero-min-height')).toBe('28rem');
  });
});
