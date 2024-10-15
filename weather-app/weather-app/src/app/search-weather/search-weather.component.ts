import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

Chart.register(...registerables);

interface FavoriteCity {
  city: string;
  temperature: number;
  weatherCondition: number;
  windSpeed: number;
}

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchWeatherComponent implements OnInit {
  city: string = '';
  weatherData: any;
  hourlyTemperatures: number[] = [];
  chart: Chart | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  async searchWeather() {
    this.weatherData = await this.weatherService.getWeather(this.city);
    await this.getHourlyForecast();
  }

  async getHourlyForecast() {
    const temperatures = await this.weatherService.getHourlyForecast(this.city);
    this.hourlyTemperatures = temperatures;
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.hourlyTemperatures.map((_, index) => `${index}:00`),
        datasets: [{
          label: 'Temperature (°C)',
          data: this.hourlyTemperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  
  addToFavorites() {
    const favorites: FavoriteCity[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteData: FavoriteCity = {
      city: this.city,
      temperature: this.weatherData.current_weather.temperature,
      weatherCondition: this.weatherData.current_weather.weathercode,
      windSpeed: this.weatherData.current_weather.windspeed
    };

    if (!favorites.some(fav => fav.city === this.city)) {
      favorites.push(favoriteData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`${this.city} aggiunta ai preferiti!`);
    } else {
      console.log(`${this.city} è già nei preferiti!`);
    }
  }
}