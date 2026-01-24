# Angular Boiler Plate

Start your development for admin panel/back office, by just cloning. Contain full structure with newly available concept

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## What goes where
# Core Module (app/core)

core/auth/ <br />
├── auth.service.ts # login, logout, refresh <br />
├── token.service.ts # access/refresh token handling <br />
├── auth.guard.ts # isAuthenticated <br />
├── role.guard.ts # RBAC <br />
├── permission.guard.ts # fine-grained access <br />

core/interceptors/ <br />
├── auth.interceptor.ts # attach token <br />
├── error.interceptor.ts # normalize API errors <br />
├── retry.interceptor.ts # retry failed calls <br />
├── loading.interceptor.ts # global loader <br />


core/services/ <br />
├── api.service.ts # wrapper over HttpClient <br />
├── config.service.ts # runtime config (env, flags) <br />
├── i18n.service.ts # language switch logic <br />
├── logger.service.ts # prod-safe logging <br />

core/layout/ <br />
├── admin-layout.component.ts <br />
├── header.component.ts <br />
├── sidebar.component.ts <br />

# Shared Module Module (app/shared)

shared/components/ <br />
├── table/ # generic table with signals <br />
├── modal/ <br />
├── confirm-dialog/ <br />
├── pagination/ <br />
├── empty-state/ <br />
├── loader/ <br />

shared/directives/ <br />
├── has-role.directive.ts <br />
├── has-permission.directive.ts <br />
├── debounce-click.directive.ts <br />
├── auto-focus.directive.ts <br />

shared/pipes/ <br />
├── truncate.pipe.ts <br />
├── safe-html.pipe.ts <br />
├── file-size.pipe.ts <br />

shared/validators/ <br />
├── strong-password.validator.ts <br />
├── no-whitespace.validator.ts <br />

## Features
# Login
features/auth/ <br />
├── login/ <br />
│ ├── login.ts <br />
│ ├── login.html <br />
│ └── login.css <br />

# Users

features/users/ <br />
├── pages/ <br />
│ ├── user-list.page.ts <br />
│ ├── user-create.page.ts <br />
│ └── user-details.page.ts <br />
│
├── components/ <br />
│ ├── user-table.component.ts <br />
│ └── user-form.component.ts <br />
│
├── store/ <br />
│ ├── users.store.ts # SignalStore <br />
│ └── users.effects.ts <br />
│
├── services/ <br />
│ └── users.api.ts <br />
│
├── users.routes.ts <br />
└── users.feature.ts <br />
