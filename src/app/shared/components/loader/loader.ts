import { Component, inject, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';
//need changes for deprications
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('200ms ease-in-out'))
    ])
  ],
  template: `
  @if(loadingService.isLoading()){
    <div @fade  class="loader-backdrop">
      <div class="loader-spinner">
        <ng-content></ng-content>
      </div>
    </div>
  }
    
  `,
  styles: [`
    .loader-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loader-spinner {
      width: 60px;
      height: 60px;
      border: 6px solid #ccc;
      border-top-color: #1d4ed8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class Loader {
  loadingService = inject(LoadingService);

  @Input() custom = false; // optional custom content
}
