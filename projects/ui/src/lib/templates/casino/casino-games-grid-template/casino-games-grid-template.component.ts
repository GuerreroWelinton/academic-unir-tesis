import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zg-casino-games-grid-template',
  standalone: true,
  imports: [],
  templateUrl: './casino-games-grid-template.component.html',
  styleUrl: './casino-games-grid-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-games-grid-template"',
    'aria-label': 'Casino games grid template',
  },
})
export class ZgCasinoGamesGridTemplateComponent {}
