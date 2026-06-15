export interface User {
  id: string;
  name: string;
  phone: string;
  cardNumber: string;
  createdAt: string;
}

export interface P2PListing {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userCardNumber: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

export interface Order {
  id: string;
  listingId: string;
  type: 'buy' | 'sell';
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  price: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface Settings {
  rate: number;
  notifications: boolean;
}