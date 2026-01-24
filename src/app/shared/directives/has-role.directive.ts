import { Directive, Input, TemplateRef, ViewContainerRef, inject, signal, effect } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  private auth = inject(AuthService);
  private hasView = false;

  @Input() set appHasRole(roles: string | string[]) {
    const roleArray = Array.isArray(roles) ? roles : [roles];

    effect(() => {
      const isAllowed = roleArray.some(role => this.auth.hasRole(role));
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
