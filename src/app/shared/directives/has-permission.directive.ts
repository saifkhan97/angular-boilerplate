import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {

  private auth = inject(AuthService);
  private hasView = false;

  @Input() set appHasPermission(permissions: string | string[]) {
    const permsArray = Array.isArray(permissions) ? permissions : [permissions];

    effect(() => {
      const isAllowed = permsArray.some(p => this.auth.hasPermission(p));
      if (isAllowed && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!isAllowed && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
