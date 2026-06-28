export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export type EventType = 'formal' | 'informal';

export interface EventCategory {
  id: string;
  name: string;
  type: EventType;
  icon: string;
  description: string;
  startingPrice: number;
  capacity: number;
  duration: string;
  locations: string[]; // cities
  image: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface Hall {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  capacity: number;
  pricePerDay: number;
  amenities: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  features: string[]; // special key features
  eventTypes: EventType[]; // e.g., ['formal', 'informal']
}

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  category: 'catering' | 'decoration' | 'entertainment' | 'logistics';
  icon: string;
  description: string;
}

export type TimeSlotType = 'Morning' | 'Afternoon' | 'Evening' | 'Full Day';

export interface TimeSlot {
  id: TimeSlotType;
  name: string;
  time: string;
  priceMultiplier: number;
}

export interface Booking {
  id: string;
  hallId: string;
  hallName: string;
  cityName: string;
  eventType: string;
  date: string; // YYYY-MM-DD
  slot: TimeSlotType;
  guests: number;
  services: string[]; // ids of extra services
  totalPrice: number;
  status: 'Confirmed' | 'Pending';
  paymentMethod: 'Pay Now' | 'Pay at Venue';
  userName: string;
  userEmail: string;
  createdAt: string;
}

export interface Review {
  id: string;
  hallId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
