import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../../../models/ui/table-column.model';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <table class="app-table">
      <thead>
        <tr>
          @if(selectable){
            <th >
              <input type="checkbox" [checked]="allSelected()" (change)="toggleAll($event)">
            </th>
          }
          
          @for (col of columns; track col.key) {
            <th  (click)="sortBy(col)" [style.width]="col.width">
              {{ col.label }}
              @if(col.sortable){
                <span >
                  {{ sortColumn() === col.key ? (sortDirection() === 'asc' ? '▲' : '▼') : '' }}
                </span>
              }
            </th>
          }
          
        </tr>
      </thead>
      <tbody>
        @for (row of pagedData(); track row) {
          <tr >
            @if(selectable){
              <td >
                <input type="checkbox" [checked]="isSelected(row)" (change)="toggleRow(row)">
              </td>
            }
            @for (col of columns; track col.key) {
              <td >{{ row[col.key] }}</td>
            }
          </tr>
        }
        @if(pagedData().length === 0){
          <tr >
            <td [attr.colspan]="columns.length + (selectable ? 1 : 0)">No data</td>
          </tr>
        }
        
      </tbody>
    </table>
      @if(totalPages() > 1){
        <div  class="pagination">
          <button (click)="prevPage()" [disabled]="currentPage() === 1">Prev</button>
          <span>{{ currentPage() }} / {{ totalPages() }}</span>
          <button (click)="nextPage()" [disabled]="currentPage() === totalPages()">Next</button>
        </div>
      }
    
  `,
  styles: [`
    .app-table {
      width: 100%;
      border-collapse: collapse;
    }
    .app-table th, .app-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .app-table th {
      cursor: pointer;
      background: #f3f3f3;
    }
    .pagination {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      gap: 8px;
    }
  `]
})
export class TableComponent<T = any> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() set data(value: T[]) { this._data.set(value || []); }
  @Input() pageSize = 10;
  @Input() selectable = false;
  @Output() selectionChange = new EventEmitter<T[]>();

  private _data = signal<T[]>([]);
  private _currentPage = signal(1);
  private _sortColumn = signal<keyof T | null>(null);
  private _sortDirection = signal<'asc' | 'desc'>('asc');
  private _selectedRows = signal<T[]>([]);

  pagedData = computed(() => {
    let sorted = [...this._data()];
    if (this._sortColumn()) {
      sorted.sort((a, b) => {
        const key = this._sortColumn()!;
        const dir = this._sortDirection() === 'asc' ? 1 : -1;
        return (a[key] > b[key] ? 1 : -1) * dir;
      });
    }
    const start = (this._currentPage() - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this._data().length / this.pageSize));
  currentPage = this._currentPage;
  sortColumn = this._sortColumn;
  sortDirection = this._sortDirection;

  /** Sorting */
  sortBy(col: TableColumn<T>) {
    if (!col.sortable) return;
    if (this._sortColumn() === col.key) {
      this._sortDirection.set(this._sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this._sortColumn.set(col.key);
      this._sortDirection.set('asc');
    }
  }

  /** Pagination */
  nextPage() { if (this._currentPage() < this.totalPages()) this._currentPage.update(p => p + 1); }
  prevPage() { if (this._currentPage() > 1) this._currentPage.update(p => p - 1); }

  /** Selection */
  isSelected(row: T) { return this._selectedRows().includes(row); }
  toggleRow(row: T) {
    const selected = this._selectedRows();
    if (selected.includes(row)) this._selectedRows.set(selected.filter(r => r !== row));
    else this._selectedRows.set([...selected, row]);
    this.selectionChange.emit(this._selectedRows());
  }

  allSelected() { return this._selectedRows().length === this._data().length; }
  toggleAll(event: Event) {
    if ((event.target as HTMLInputElement).checked) this._selectedRows.set([...this._data()]);
    else this._selectedRows.set([]);
    this.selectionChange.emit(this._selectedRows());
  }
}
