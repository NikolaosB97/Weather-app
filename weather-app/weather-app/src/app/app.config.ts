import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CommonModule),  // Aggiungi qui tutti i moduli di cui hai bisogno
    provideRouter([])
  ]
};