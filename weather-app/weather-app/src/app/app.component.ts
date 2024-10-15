import { Component } from '@angular/core';
import { SearchWeatherComponent } from './search-weather/search-weather.component';
import { FavoriteCitiesComponent } from './favorite-cities/favorite-cities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,  // AppComponent è standalone
  imports: [SearchWeatherComponent, FavoriteCitiesComponent]  // Import dei componenti standalone
})
export class AppComponent {
  title = 'weather-app';
}