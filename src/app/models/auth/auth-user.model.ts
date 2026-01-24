import { Permission } from "./permission.model";
import { Role } from "./role.model";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: Role[];
  permissions: Permission[];
}
