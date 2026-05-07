export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface Booking {
  id: string;
  clientId: string;
  userId: string;
  resourceId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  resource?: {
    id: string;
    name: string;
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
  };
}

export interface BookingFormData {
  clientId: string;
  userId: string;
  resourceId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status?: BookingStatus;
  notes?: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  fromDate?: string;
  toDate?: string;
  resourceId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Resource {
  id: string;
  name: string;
  pricePerHour: number;
}