
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, AnimationTriggerMetadata } from '@angular/animations';

const fadeAnimation: AnimationTriggerMetadata = trigger('fade', [
  transition(':enter', [style({ opacity: 0 }), animate('200ms ease-in', style({ opacity: 1 }))]),
  transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))])
]);

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeAnimation],
  template: `
  @if(visible()){
    <div class="backdrop" @fade >
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
  styles: [`
    .backdrop {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .dialog {
      background: white;
      padding: 24px;
      border-radius: 8px;
      min-width: 300px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: scaleIn 200ms ease-in-out;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .cancel-btn {
      background: #ccc;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    .confirm-btn {
      background: #1d4ed8;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    @keyframes scaleIn {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `]
})
export class ConfirmDialog {

  /** Signals */
  private _visible = signal(false);
  visible = this._visible;

  /** Dialog properties */
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure you want to continue?';

  /** Events */
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  /** Open the dialog */
  open(title?: string, message?: string) {
    if (title) this.title = title;
    if (message) this.message = message;
    this._visible.set(true);
  }

  /** Close dialog */
  close() {
    this._visible.set(false);
  }

  /** Confirm clicked */
  confirm() {
    this.onConfirm.emit();
    this.close();
  }

  /** Cancel clicked */
  cancel() {
    this.onCancel.emit();
    this.close();
  }
}
