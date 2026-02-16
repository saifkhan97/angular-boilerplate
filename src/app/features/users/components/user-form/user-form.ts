import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export interface UserFormValue {
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm {
  private readonly fb = inject(FormBuilder);

  @Output() save = new EventEmitter<UserFormValue>();

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    isActive: true
  });

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }
}
