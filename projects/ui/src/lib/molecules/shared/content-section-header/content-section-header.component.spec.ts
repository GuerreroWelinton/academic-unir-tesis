import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZgSectionTitleComponent } from '../../../atoms/section-title/section-title.component';
import { ZgSectionActionsComponent } from '../section-actions/section-actions.component';
import { ZgContentSectionHeaderComponent } from './content-section-header.component';

@Component({
  standalone: true,
  imports: [ZgContentSectionHeaderComponent, ZgSectionTitleComponent, ZgSectionActionsComponent],
  template: `
    <zg-content-section-header>
      <zg-section-title zg-content-section-header-title label="Most Bet Games"></zg-section-title>
      <zg-section-actions zg-content-section-header-actions></zg-section-actions>
    </zg-content-section-header>
  `,
})
class HostWithActionsComponent {}

@Component({
  standalone: true,
  imports: [ZgContentSectionHeaderComponent, ZgSectionTitleComponent],
  template: `
    <zg-content-section-header>
      <zg-section-title zg-content-section-header-title label="Title only"></zg-section-title>
    </zg-content-section-header>
  `,
})
class HostWithoutActionsComponent {}

@Component({
  standalone: true,
  imports: [ZgContentSectionHeaderComponent],
  template: `
    <zg-content-section-header>
      <h2 zg-content-section-header-title>Custom projected title</h2>
      <button zg-content-section-header-actions type="button">Custom projected action</button>
    </zg-content-section-header>
  `,
})
class HostCustomProjectionComponent {}

describe('ZgContentSectionHeaderComponent', () => {
  let fixture: ComponentFixture<HostWithActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostWithActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostWithActionsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render projected title and actions components', () => {
    const title = fixture.debugElement.query(By.css('zg-section-title'));
    const actions = fixture.debugElement.query(By.css('zg-section-actions'));

    expect(title).toBeTruthy();
    expect(actions).toBeTruthy();
  });

  it('should keep projected title text', () => {
    const titleText = fixture.debugElement.query(By.css('.zg-section-title__text'));
    expect(titleText.nativeElement.textContent.trim()).toBe('Most Bet Games');
  });

  it('should work without projected actions', async () => {
    const noActionsFixture = TestBed.createComponent(HostWithoutActionsComponent);
    noActionsFixture.detectChanges();

    const title = noActionsFixture.debugElement.query(By.css('zg-section-title'));
    const actions = noActionsFixture.debugElement.query(By.css('zg-section-actions'));

    expect(title).toBeTruthy();
    expect(actions).toBeNull();
  });

  it('should project custom non-library content in both slots', async () => {
    const customFixture = TestBed.createComponent(HostCustomProjectionComponent);
    customFixture.detectChanges();

    const title = customFixture.debugElement.query(By.css('h2'));
    const action = customFixture.debugElement.query(By.css('button'));

    expect(title.nativeElement.textContent.trim()).toBe('Custom projected title');
    expect(action.nativeElement.textContent.trim()).toBe('Custom projected action');
  });
});
