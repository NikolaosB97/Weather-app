import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
interface FavoriteCity {
  city: string;
  temperature: number;
  weatherCondition: number; 
  windSpeed: number; 
}

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss'],
  standalone: true,
  imports: [CommonModule] 
})
export class FavoriteCitiesComponent implements OnInit {
  favorites: FavoriteCity[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFromFavorites(favorite: FavoriteCity) {
    const updatedFavorites = this.favorites.filter(fav => fav.city !== favorite.city);
    this.favorites = updatedFavorites;
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  sortFavoritesByTemperature() {
    this.favorites.sort((a, b) => b.temperature - a.temperature);
  }

  getWeatherCondition(weatherCondition: number): string {
    const conditions: { [key: number]: string } = {
      0: 'Soleggiato',
      1: 'Parzialmente Nuvoloso',
      2: 'Coperto',
      3: 'Nuvoloso',
    };
    return conditions[weatherCondition] || 'Condizione sconosciuta';
  }
}