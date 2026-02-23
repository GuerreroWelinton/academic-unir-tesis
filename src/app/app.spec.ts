import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ZGames UI Library');
  });

  it('should initialize default client and variant', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as unknown as {
      selectedClient: () => string;
      selectedVariant: () => string;
      themeOptions: () => string[];
    };

    expect(app.selectedClient()).toBe('client1');
    expect(app.selectedVariant()).toBe('light');
    expect(app.themeOptions()).toEqual(['light', 'dark', 'christmas']);
  });

  it('should change client and keep current variant when available', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as unknown as {
      onClientChange: (event: Event) => void;
      selectedClient: () => string;
      selectedVariant: () => string;
      themeOptions: () => string[];
    };

    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 'client2' } });
    app.onClientChange(event);

    expect(app.selectedClient()).toBe('client2');
    expect(app.selectedVariant()).toBe('light');
    expect(app.themeOptions()).toEqual(['light', 'dark', 'christmas']);
  });

  it('should fallback to first available variant when current variant is unavailable', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as unknown as {
      onClientChange: (event: Event) => void;
      selectedVariant: { set: (value: string) => void } & (() => string);
      selectedClient: () => string;
    };

    app.selectedVariant.set('nonexistent-variant');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 'client2' } });
    app.onClientChange(event);

    expect(app.selectedClient()).toBe('client2');
    expect(app.selectedVariant()).toBe('light');
  });

  it('should default to client1 when change event target is null', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as unknown as {
      onClientChange: (event: Event) => void;
      selectedClient: () => string;
    };

    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: null });
    app.onClientChange(event);

    expect(app.selectedClient()).toBe('client1');
  });

  it('should change theme variant and fallback to light when target is null', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as unknown as {
      onThemeChange: (event: Event) => void;
      selectedVariant: () => string;
    };

    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 'dark' } });
    app.onThemeChange(event);
    expect(app.selectedVariant()).toBe('dark');

    const nullTargetEvent = new Event('change');
    Object.defineProperty(nullTargetEvent, 'target', { value: null });
    app.onThemeChange(nullTargetEvent);
    expect(app.selectedVariant()).toBe('light');
  });
});
