import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zg-casino-home-template',
  standalone: true,
  imports: [],
  templateUrl: './casino-home-template.component.html',
  styleUrl: './casino-home-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-home-template"',
    'aria-label': 'Casino home template',
  },
})
export class ZgCasinoHomeTemplateComponent {}
