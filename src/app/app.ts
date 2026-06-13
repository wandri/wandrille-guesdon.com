import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MenuComponent, FooterComponent]
})
export class App {
  title = 'wandrille-guesdon.com';
}
