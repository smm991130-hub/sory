import { User, P2PListing, Message, Order, Settings } from '../types';

const KEYS = {
  CURRENT_USER: 'usdt_p2p_current_user',
  USERS: 'usdt_p2p_users',
  LISTINGS: 'usdt_p2p_listings',
  MESSAGES: 'usdt_p2p_messages',
  ORDERS: 'usdt_p2p_orders',
  SETTINGS: 'usdt_p2p_settings',
};

export const storage = {
  // Users
  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  addUser: (user: User): void => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearCurrentUser: (): void => {
    localStorage.removeItem(KEYS.CURRENT_USER);
  },

  // Listings
  getListings: (): P2PListing[] => {
    const data = localStorage.getItem(KEYS.LISTINGS);
    return data ? JSON.parse(data) : [];
  },

  addListing: (listing: P2PListing): void => {
    const listings = storage.getListings();
    listings.unshift(listing);
    localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
    window.dispatchEvent(new CustomEvent('listings_update'));
  },

  deleteListing: (id: string): void => {
    const listings = storage.getListings().filter(l => l.id !== id);
    localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
    window.dispatchEvent(new CustomEvent('listings_update'));
  },

  updateListing: (id: string, updates: Partial<P2PListing>): void => {
    const listings = storage.getListings();
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      listings[index] = { ...listings[index], ...updates };
      localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
      window.dispatchEvent(new CustomEvent('listings_update'));
    }
  },

  // Messages
  getMessages: (): Message[] => {
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },

  addMessage: (message: Message): void => {
    const messages = storage.getMessages();
    messages.push(message);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('messages_update'));
  },

  // Orders
  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  addOrder: (order: Order): void => {
    const orders = storage.getOrders();
    orders.unshift(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('orders_update'));
  },

  updateOrder: (id: string, updates: Partial<Order>): void => {
    const orders = storage.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
      window.dispatchEvent(new CustomEvent('orders_update'));
    }
  },

  // Settings
  getSettings: (): Settings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { rate: 12650, notifications: true };
  },

  saveSettings: (settings: Settings): void => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
};