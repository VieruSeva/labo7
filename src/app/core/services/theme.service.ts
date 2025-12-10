import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'aurora-theme';
  private darkMode = false;

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  isDark(): boolean {
    return this.darkMode;
  }

  toggleTheme(): void {
    this.setDarkMode(!this.darkMode);
  }

  private setDarkMode(value: boolean): void {
    this.darkMode = value;
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(value ? 'theme-dark' : 'theme-light');
    localStorage.setItem(this.storageKey, value ? 'dark' : 'light');
  }
}