import { Injectable, signal } from '@angular/core';

export type LanguageCode = 'en' | 'hi';

@Injectable({ providedIn: 'root' })
export class I18nService {

  private readonly _language = signal<LanguageCode>('en');
  readonly language = this._language.asReadonly();

  constructor() {
    const storedLang = localStorage.getItem('language') as LanguageCode | null;
    if (storedLang) {
      this._language.set(storedLang);
    }
  }

  setLanguage(lang: LanguageCode): void {
    this._language.set(lang);
    localStorage.setItem('language', lang);
  }
}
