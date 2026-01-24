import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  /**
   * Tracks number of active requests
   * Prevents loader flicker when multiple APIs run in parallel
   */
  private readonly _requestCount = signal(0);

  /**
   * Public readonly signal
   */
  readonly isLoading = computed(() => this._requestCount() > 0);

  show(): void {
    this._requestCount.update(count => count + 1);
  }

  hide(): void {
    this._requestCount.update(count => Math.max(0, count - 1));
  }

  reset(): void {
    this._requestCount.set(0);
  }
}
