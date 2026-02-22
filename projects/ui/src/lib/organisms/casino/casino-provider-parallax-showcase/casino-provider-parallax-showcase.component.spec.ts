import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoProviderParallaxShowcaseComponent } from './casino-provider-parallax-showcase.component';

describe('ZgCasinoProviderParallaxShowcaseComponent', () => {
  let component: ZgCasinoProviderParallaxShowcaseComponent;
  let fixture: ComponentFixture<ZgCasinoProviderParallaxShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoProviderParallaxShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoProviderParallaxShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render provider title', () => {
    fixture.componentRef.setInput('providerName', 'Videoslots');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.zg-casino-provider-parallax-showcase__title'))
      .nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Videoslots');
  });

  it('should apply background image style', () => {
    fixture.componentRef.setInput(
      'backgroundImageUrl',
      'https://placehold.co/1200x600?text=Provider',
    );
    fixture.detectChanges();

    const pane = fixture.debugElement.query(
      By.css('.zg-casino-provider-parallax-showcase__surface'),
    ).nativeElement as HTMLElement;

    expect(pane.style.backgroundImage).toContain('placehold.co/1200x600?text=Provider');
  });

  it('should emit ctaClicked when arrow button is clicked', () => {
    const emitSpy = vi.spyOn(component.ctaClicked, 'emit');
    const button = fixture.debugElement.query(
      By.css('.zg-casino-provider-parallax-showcase__intro button'),
    ).nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
