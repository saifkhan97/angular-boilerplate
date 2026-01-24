import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective {
  @Input() debounceTime = 500; // ms
  @Output() debounceClick = new EventEmitter<Event>();

  private isCooldown = false;

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    if (this.isCooldown) return;

    this.isCooldown = true;
    this.debounceClick.emit(event);

    setTimeout(() => {
      this.isCooldown = false;
    }, this.debounceTime);
  }
}
