export interface TableColumn<T = any> {
   key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
}
