import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_URL = 'https://api.open-meteo.com/v1/forecast?current_weather=true';
  private GEOCODE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
  private GEOCODE_API_KEY = '6cb3a25dff12428ab5af457c3fcb1587'; // La tua chiave API di OpenCage

  constructor() {}

  // Funzione per ottenere il meteo di una città
  async getWeather(city: string): Promise<any> {
    try {
      // Geocodifica della città con OpenCageData per ottenere latitudine e longitudine
      const geocodeResponse = await axios.get(`${this.GEOCODE_API_URL}?q=${city}&key=${this.GEOCODE_API_KEY}`);
      const { lat, lng } = geocodeResponse.data.results[0].geometry;

      // Richiesta meteo a OpenMeteo con latitudine e longitudine
      const weatherResponse = await axios.get(`${this.API_URL}&latitude=${lat}&longitude=${lng}`);
      return weatherResponse.data;
    } catch (error) {
      console.error('Errore nel recuperare i dati meteo', error);
      return null;
    }
  }

  // Funzione per ottenere il grafico delle temperature per le prossime 24 ore
  async getHourlyForecast(city: string): Promise<number[]> {
    try {
      // Stesso processo: geocodifica e richiesta meteo
      const geocodeResponse = await axios.get(`${this.GEOCODE_API_URL}?q=${city}&key=${this.GEOCODE_API_KEY}`);
      const { lat, lng } = geocodeResponse.data.results[0].geometry;

      // Richiediamo i dati orari
      const forecastResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`);
      return forecastResponse.data.hourly.temperature_2m; // Restituiamo solo le temperature
    } catch (error) {
      console.error('Errore nel recuperare i dati orari', error);
      return [];
    }
  }
}