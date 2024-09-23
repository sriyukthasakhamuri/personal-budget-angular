import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AboutComponent} from "./about/about.component";
import {MenuComponent} from "./menu/menu.component";
import {FooterComponent} from "./footer/footer.component";
import {ContactComponent} from "./contact/contact.component";
import {HeroComponent} from "./hero/hero.component";

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, HeroComponent, AboutComponent, ContactComponent, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
