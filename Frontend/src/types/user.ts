export type UserRole = "SUPERADMIN" | "ADMIN" | "STAFF" | "CUSTOMER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithMemberships extends User {
  memberships: Membership[];
}

export interface Membership {
  id: string;
  userId: string;
  clientId: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: "Activo" | "Inactivo";
  active: boolean;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  role?: UserRole;
  password?: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  avatarUrl?: string;
  role?: UserRole;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilterParams {
  q?: string;
  role?: UserRole;
  status?: "active" | "inactive";
  page?: number;
  limit?: number;
}