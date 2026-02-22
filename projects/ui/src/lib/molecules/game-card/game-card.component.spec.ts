import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgGameCardComponent } from './game-card.component';

describe('ZgGameCardComponent', () => {
  let component: ZgGameCardComponent;
  let fixture: ComponentFixture<ZgGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgGameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgGameCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Aviator');
    fixture.componentRef.setInput('provider', 'Spribe');
    fixture.componentRef.setInput(
      'imageUrl',
      'https://api-casino.zgames.tech/images/aleaplay/vertical/aviator.webp',
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and provider', () => {
    const title = fixture.debugElement.query(By.css('.zg-game-card__title'))
      .nativeElement as HTMLElement;
    const provider = fixture.debugElement.query(By.css('.zg-game-card__provider'))
      .nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Aviator');
    expect(provider.textContent?.trim()).toBe('Spribe');
  });

  it('should emit playClicked when play button is clicked', () => {
    const emitSpy = vi.spyOn(component.playClicked, 'emit');
    const button = fixture.debugElement.query(By.css('.zg-game-card__play-button'))
      .nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit favoriteClicked when favorite button is clicked', () => {
    const emitSpy = vi.spyOn(component.favoriteClicked, 'emit');
    const button = fixture.debugElement.query(By.css('.zg-game-card__favorite'))
      .nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit events when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const playSpy = vi.spyOn(component.playClicked, 'emit');
    const favSpy = vi.spyOn(component.favoriteClicked, 'emit');

    const playButton = fixture.debugElement.query(By.css('.zg-game-card__play-button'))
      .nativeElement as HTMLButtonElement;
    const favoriteButton = fixture.debugElement.query(By.css('.zg-game-card__favorite'))
      .nativeElement as HTMLButtonElement;

    playButton.click();
    favoriteButton.click();

    expect(playSpy).not.toHaveBeenCalled();
    expect(favSpy).not.toHaveBeenCalled();
  });
});
