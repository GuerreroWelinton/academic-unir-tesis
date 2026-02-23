import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgCasinoHomeTemplateComponent } from './casino-home-template.component';

describe('ZgCasinoHomeTemplateComponent', () => {
  let component: ZgCasinoHomeTemplateComponent;
  let fixture: ComponentFixture<ZgCasinoHomeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgCasinoHomeTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgCasinoHomeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout wrappers for all slots', () => {
    const heroSlot = fixture.debugElement.query(By.css('.zg-casino-home-template__hero'));
    const searchSlot = fixture.debugElement.query(By.css('.zg-casino-home-template__search'));
    const categoriesSlot = fixture.debugElement.query(
      By.css('.zg-casino-home-template__categories'),
    );
    const sectionsSlot = fixture.debugElement.query(By.css('.zg-casino-home-template__sections'));

    expect(heroSlot).toBeTruthy();
    expect(searchSlot).toBeTruthy();
    expect(categoriesSlot).toBeTruthy();
    expect(sectionsSlot).toBeTruthy();
  });

  it('should expose an accessible label on host', () => {
    const host = fixture.debugElement.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-label')).toBe('Casino home template');
  });
});
