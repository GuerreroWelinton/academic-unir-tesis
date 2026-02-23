import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgBreadcrumbComponent } from './breadcrumb.component';

describe('ZgBreadcrumbComponent', () => {
  let component: ZgBreadcrumbComponent;
  let fixture: ComponentFixture<ZgBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZgBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZgBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'casino', label: 'Casino', href: '/casino' },
      { id: 'most-bet', label: 'Most bet' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all breadcrumb items', () => {
    const items = fixture.debugElement.queryAll(By.css('.zg-breadcrumb__item'));
    expect(items.length).toBe(3);
  });

  it('should mark last item as current page by default', () => {
    const current = fixture.debugElement.query(By.css('[aria-current="page"]'));
    expect(current.nativeElement.textContent.trim()).toBe('Most bet');
  });

  it('should emit itemClicked for clickable links', () => {
    const emitSpy = vi.spyOn(component.itemClicked, 'emit');
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

  it('should not emit itemClicked for current item', () => {
    const emitSpy = vi.spyOn(component.itemClicked, 'emit');
    const current = fixture.debugElement.query(By.css('[aria-current="page"]'))
      .nativeElement as HTMLElement;

    current.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should use custom separator', () => {
    fixture.componentRef.setInput('separator', '/');
    fixture.detectChanges();

    const separators = fixture.debugElement.queryAll(By.css('.zg-breadcrumb__separator'));
    expect(separators[0].nativeElement.textContent.trim()).toBe('/');
  });
});
