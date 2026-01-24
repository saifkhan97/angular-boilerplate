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
├── auth.service.ts # login, logout, refresh
├── token.service.ts # access/refresh token handling
├── auth.guard.ts # isAuthenticated
├── role.guard.ts # RBAC
├── permission.guard.ts # fine-grained access

core/interceptors/
├── auth.interceptor.ts # attach token
├── error.interceptor.ts # normalize API errors
├── retry.interceptor.ts # retry failed calls
├── loading.interceptor.ts # global loader


core/services/
├── api.service.ts # wrapper over HttpClient
├── config.service.ts # runtime config (env, flags)
├── i18n.service.ts # language switch logic
├── logger.service.ts # prod-safe logging

core/layout/
├── admin-layout.component.ts
├── header.component.ts
├── sidebar.component.ts

# Shared Module Module (app/shared)

shared/components/
├── table/ # generic table with signals
├── modal/
├── confirm-dialog/
├── pagination/
├── empty-state/
├── loader/

shared/directives/
├── has-role.directive.ts
├── has-permission.directive.ts
├── debounce-click.directive.ts
├── auto-focus.directive.ts

shared/pipes/
├── truncate.pipe.ts
├── safe-html.pipe.ts
├── file-size.pipe.ts

shared/validators/
├── strong-password.validator.ts
├── no-whitespace.validator.ts

## Features
# Login
features/auth/
├── login/
│ ├── login.ts
│ ├── login.html
│ └── login.css

# Users

features/users/
├── pages/
│ ├── user-list.page.ts
│ ├── user-create.page.ts
│ └── user-details.page.ts
│
├── components/
│ ├── user-table.component.ts
│ └── user-form.component.ts
│
├── store/
│ ├── users.store.ts # SignalStore
│ └── users.effects.ts
│
├── services/
│ └── users.api.ts
│
├── users.routes.ts
└── users.feature.ts
