import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
  pure: true
})
export class FileSizePipe implements PipeTransform {
  transform(value: number | null | undefined, decimals: number = 2): string {
    if (value == null || value === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(value) / Math.log(k));

    return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
