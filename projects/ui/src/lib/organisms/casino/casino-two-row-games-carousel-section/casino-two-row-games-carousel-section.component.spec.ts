import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoTwoRowGamesCarouselSectionComponent } from './casino-two-row-games-carousel-section.component';

describe('ZgCasinoTwoRowGamesCarouselSectionComponent', () => {
  let component: ZgCasinoTwoRowGamesCarouselSectionComponent;
  let fixture: ComponentFixture<ZgCasinoTwoRowGamesCarouselSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoTwoRowGamesCarouselSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoTwoRowGamesCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two rows grouped by columns', () => {
    fixture.componentRef.setInput('items', [
      { id: 'a', title: 'A', imageUrl: 'https://placehold.co/320x320?text=A' },
      { id: 'b', title: 'B', imageUrl: 'https://placehold.co/320x320?text=B' },
      { id: 'c', title: 'C', imageUrl: 'https://placehold.co/320x320?text=C' },
    ]);
    fixture.detectChanges();

    const columns = fixture.debugElement.queryAll(
      By.css('.zg-casino-two-row-games-carousel-section__column'),
    );
    const cards = fixture.debugElement.queryAll(By.css('zg-casino-game-card'));

    expect(columns.length).toBe(2);
    expect(cards.length).toBe(3);
  });

  it('should hide header when showHeader is false', () => {
    fixture.componentRef.setInput('showHeader', false);
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('zg-section-title'));
    expect(heading).toBeNull();
  });

  it('should emit viewAllClicked', () => {
    const emitSpy = vi.spyOn(component.viewAllClicked, 'emit');
    const button = fixture.debugElement.query(By.css('[zg-section-actions-all] button'))
      .nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit playRequested when play is clicked', () => {
    fixture.componentRef.setInput('items', [
      { id: 'a', title: 'A', imageUrl: 'https://placehold.co/320x320?text=A' },
    ]);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.playRequested, 'emit');
    const playButton = fixture.debugElement.query(By.css('button.zg-game-card__play-button'))
      .nativeElement as HTMLButtonElement;

    playButton.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'a',
      }),
    );
  });
});
