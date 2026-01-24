import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  // Removed animations: [fadeAnimation]
  template: `
  @if(visible()){
    <div class="backdrop" 
         animate.enter="fade-in" 
         animate.leave="fade-out"
         (animate.leave)="$event.animationComplete()">
      
      <div class="dialog">
        <h3 class="title">{{ title }}</h3>
        <p class="message">{{ message }}</p>

        <div class="actions">
          <button class="cancel-btn" (click)="cancel()">Cancel</button>
          <button class="confirm-btn" (click)="confirm()">Confirm</button>
        </div>
      </div>
    </div>
  }
  `,
  styleUrl:'./confirm-dialog.css'
})
export class ConfirmDialog {
  private _visible = signal(false);
  visible = this._visible;

  @Input() title = 'Confirm';
  @Input() message = 'Are you sure you want to continue?';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  open(title?: string, message?: string) {
    if (title) this.title = title;
    if (message) this.message = message;
    this._visible.set(true);
  }

  close() {
    this._visible.set(false);
  }

  confirm() {
    this.onConfirm.emit();
    this.close();
  }

  cancel() {
    this.onCancel.emit();
    this.close();
  }
}
