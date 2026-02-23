import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  type CasinoProviderCarouselItem,
  ZgCasinoProviderCarouselComponent,
} from './casino-provider-carousel.component';

describe('ZgCasinoProviderCarouselComponent', () => {
  let component: ZgCasinoProviderCarouselComponent;
  let fixture: ComponentFixture<ZgCasinoProviderCarouselComponent>;

  const providers: readonly CasinoProviderCarouselItem[] = [
    {
      id: 'wazdan',
      name: 'Wazdan',
      logoUrl: 'https://placehold.co/120x40?text=Wazdan',
    },
    {
      id: 'evoplay',
      name: 'Evoplay',
      logoUrl: 'https://placehold.co/120x40?text=Evoplay',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoProviderCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoProviderCarouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', providers);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render provider items with logo and name', () => {
    const names = fixture.debugElement.queryAll(By.css('.zg-casino-provider-carousel__name'));
    const images = fixture.debugElement.queryAll(By.css('.zg-casino-provider-carousel__logo'));

    expect(names.length).toBe(4);
    expect(images.length).toBe(4);
    expect(names[0].nativeElement.textContent.trim()).toBe('Wazdan');
  });

  it('should emit providerSelected on click', () => {
    const emitSpy = vi.spyOn(component.providerSelected, 'emit');
    const firstButton = fixture.debugElement.query(
      By.css('button.zg-casino-provider-carousel__item-button'),
    ).nativeElement as HTMLButtonElement;

    firstButton.click();

    expect(emitSpy).toHaveBeenCalledWith(providers[0]);
  });

  it('should not emit providerSelected for disabled item', () => {
    fixture.componentRef.setInput('items', [
      {
        id: 'disabled-provider',
        name: 'Disabled',
        logoUrl: 'https://placehold.co/120x40?text=Disabled',
        disabled: true,
      },
    ]);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.providerSelected, 'emit');
    const button = fixture.debugElement.query(
      By.css('button.zg-casino-provider-carousel__item-button'),
    ).nativeElement as HTMLButtonElement;

    button.click();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should render empty state when no items are provided', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('emptyMessage', 'No providers yet');
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.zg-casino-provider-carousel__empty'));
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(emptyState.nativeElement.textContent.trim()).toBe('No providers yet');
    expect(buttons.length).toBe(0);
  });

  it('should set animated host attribute when more than one item exists', () => {
    fixture.componentRef.setInput('items', providers);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-animated')).toBe('true');
  });
});
