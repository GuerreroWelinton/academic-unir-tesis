import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZgButtonComponent } from '@zgames/ui';

@Component({
  selector: 'zg-root',
  imports: [RouterOutlet, ZgButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('zg-ui');

  onButtonClick() {
    alert('¡ZGames UI funciona!');
  }
}
