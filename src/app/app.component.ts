import { Component } from '@angular/core';
import { openCloseAnimation } from './animations/open-close.animation';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [openCloseAnimation],
})
export class AppComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
