import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  // Note: 'animations' metadata block removed entirely
  template: `
    @if(loadingService.isLoading()){
      <div 
        class="loader-backdrop"
        animate.enter="fade-in" 
        animate.leave="fade-out"
        (animate.leave)="$event.animationComplete()">
        
        <div class="loader-spinner">
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
  styleUrl: './loader.css'
})
export class Loader {
  loadingService = inject(LoadingService);
  @Input() custom = false;
}
