import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Fails validation if value contains only whitespace
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (value == null) {
      return null;
    }

    if (typeof value === 'string' && value.trim().length === 0) {
      return { whitespace: true };
    }

    return null;
  };
}
