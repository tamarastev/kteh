export type PropertyType = "House" | "Apartment" | "Villa" | "Office" | "Studio";

export interface IProperty {
  id: number;
  title: string;
  location: string;
  country: string;
  price: number;
  priceUnit: "month" | "total";
  type: PropertyType;
  size: number; 
  rooms: number;
  capacity: number; 
  rating: number;
  images: string[];
  fallbackImages: string[];
  description: string;
  longDescription: string;
  featured?: boolean;
}
