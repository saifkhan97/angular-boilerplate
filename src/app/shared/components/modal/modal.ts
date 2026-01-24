import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  // Note: 'animations' array removed. Using Native CSS API.
  templateUrl:'./modal.html',
  styleUrl:'./modal.css'
})
export class Modal {
  private _visible = signal(false);
  visible = this._visible;

  @Input() title?: string;
  @Input() buttons: { label: string, action: () => void, class?: string }[] = [];
  @Input() showFooter = true;

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  open() {
    this._visible.set(true);
    this.opened.emit();
  }

  close() {
    this._visible.set(false);
    this.closed.emit();
  }
}