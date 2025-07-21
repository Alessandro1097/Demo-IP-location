import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf],
  template: `
    <div style="font-family: sans-serif; text-align: center; margin-top: 2rem;">
      <h1>GeoIP Angular 20 Standalone</h1>
      <button (click)="toggleFake()">
        Test {{ isFakeTest ? 'NORMALE' : 'FAKE ESTERO' }}
      </button>
      <p *ngIf="loading">Recupero IP...</p>
      <p *ngIf="!loading">
        Il tuo IP: <b>{{ ip }}</b><br>
        <span *ngIf="isItalian !== null">
          Sei in Italia? <b>{{ isItalian ? 'Sì 🇮🇹' : 'No ❌' }}</b>
        </span>
      </p>
    </div>
  `,
})
export class AppComponent {
  ip: string = '';
  isItalian: boolean | null = null;
  loading = true;
  isFakeTest = false; // di default "reale"

  constructor() {
    this.getIp();
  }

  toggleFake() {
    this.isFakeTest = !this.isFakeTest;
    this.getIp();
  }

  getIp() {
    this.loading = true;
    if (this.isFakeTest) {
      // --- TEST FAKE: IP USA (8.8.8.8) ---
      setTimeout(() => {
        this.ip = '8.8.8.8';
        this.isItalian = false; // USA, quindi non Italia
        this.loading = false;
      }, 500);
    } else {
      // --- TEST REALE: IPAPI ---
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          this.ip = data.ip;
          this.isItalian = data.country_code === 'IT';
          this.loading = false;
        })
        .catch(() => {
          this.ip = 'Errore nel recupero';
          this.isItalian = null;
          this.loading = false;
        });
    }
  }
}
