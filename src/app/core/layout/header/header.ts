
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { I18nService, LanguageCode } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  protected auth = inject(AuthService);
  protected i18n = inject(I18nService);

  logout(): void {
    this.auth.logout();
  }

  changeLang(event: Event): void {
  const select = event.target as HTMLSelectElement | null;
  if (!select) return;

  this.i18n.setLanguage(select.value as LanguageCode);
}
}
