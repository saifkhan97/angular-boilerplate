
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

const fadeScaleAnimation: AnimationTriggerMetadata = trigger('fadeScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
  ])
]);

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeScaleAnimation],
  template: `
  @if(visible()){
    <div class="modal-backdrop" @fadeScale >
      <div class="modal-dialog">
        @if(title){
          <div class="modal-header" >
            <h3>{{ title }}</h3>
            <button class="close-btn" (click)="close()">✖</button>
          </div>
        }
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        @if(showFooter){
          <div class="modal-footer" >
            <button *ngFor="let btn of buttons" 
                    [ngClass]="btn.class || 'btn-default'" 
                    (click)="btn.action()">
              {{ btn.label }}
            </button>
          </div>
        }
      </div>
    </div>
  }
    
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top:0; left:0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .modal-dialog {
      background: white;
      border-radius: 8px;
      min-width: 400px;
      max-width: 90%;
      max-height: 90%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }
    .modal-body {
      padding: 16px;
      overflow-y: auto;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid #eee;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
    .btn-default {
      padding: 6px 12px;
      border: 1px solid #ccc;
      background: #f3f3f3;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      padding: 6px 12px;
      border: none;
      background: #1d4ed8;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class Modal {

  /** Signal to control visibility */
  private _visible = signal(false);
  visible = this._visible;

  /** Optional title */
  @Input() title?: string;

  /** Footer buttons */
  @Input() buttons: { label: string, action: () => void, class?: string }[] = [];

  @Input() showFooter = true;

  /** Events */
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  /** Open modal */
  open() {
    this._visible.set(true);
    this.opened.emit();
  }

  /** Close modal */
  close() {
    this._visible.set(false);
    this.closed.emit();
  }
}
