export interface ResourceType {
  id: string;
  clientId: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface Resource {
  id: string;
  clientId: string;
  resourceTypeId: string;
  name: string;
  description: string | null;
  pricePerHour: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  resourceType?: ResourceType;
  status?: string;
}

export interface ResourceFormData {
  name: string;
  description: string;
  pricePerHour: number;
  resourceTypeId: string;
}