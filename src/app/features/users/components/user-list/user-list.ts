import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { User } from '../../../../models/user/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList {
  @Input({ required: true }) users!: readonly User[];
}
