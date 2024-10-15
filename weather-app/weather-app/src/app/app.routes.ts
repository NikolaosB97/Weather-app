import { Routes } from '@angular/router';
import { SearchWeatherComponent } from './search-weather/search-weather.component';
import { FavoriteCitiesComponent } from './favorite-cities/favorite-cities.component';

export const routes: Routes = [
  {
    path: 'search-weather',
    component: SearchWeatherComponent
  },
  {
    path: 'favorite-cities',
    component: FavoriteCitiesComponent
  },
  {
    path: '',
    redirectTo: 'search-weather',
    pathMatch: 'full'
  }
];