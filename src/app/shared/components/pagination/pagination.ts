
import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(totalPages() > 1){
      <nav class="pagination-container" >
        <button (click)="prev()" [disabled]="currentPage() === 1">Prev</button>
        @for(page of pages(); track page){
          <button  (click)="goToPage(page)"  [class.active]="page === currentPage()">
            {{ page }}
          </button>
        }
        <button (click)="next()" [disabled]="currentPage() === totalPages()">Next</button>
      </nav>
    }
    
  `,
  styles: [`
    .pagination-container {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
    }
    button {
      padding: 4px 8px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
      border-radius: 4px;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    button.active {
      background-color: #1d4ed8;
      color: white;
      font-weight: bold;
    }
  `]
})
export class Pagination {

  /** Total items in list */
  @Input() totalItems = 0;

  /** Items per page */
  @Input() pageSize = 10;

  /** Current page (two-way binding) */
  @Input() current = 1;

  @Output() pageChange = new EventEmitter<number>();

  /** Internal signals */
  private _currentPage = signal(this.current);

  /** Computed total pages */
  totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize));

  /** Expose current page as signal */
  currentPage = this._currentPage;

  /** Pages array for template */
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  /** Methods */
  goToPage(page: number) {
    this._currentPage.set(page);
    this.pageChange.emit(page);
  }

  next() {
    if (this._currentPage() < this.totalPages()) this.goToPage(this._currentPage() + 1);
  }

  prev() {
    if (this._currentPage() > 1) this.goToPage(this._currentPage() - 1);
  }
}
