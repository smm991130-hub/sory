import { useState, useEffect } from 'react';
import { storage } from './storage';
import { Order } from '../types';

export function useOrders(currentUserId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  useEffect(() => {
    setOrders(storage.getOrders());

    const handleUpdate = () => {
      setOrders(storage.getOrders());
    };

    window.addEventListener('orders_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('orders_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, number> = {};
      orders.forEach(order => {
        if (order.status === 'pending') {
          const expires = new Date(order.expiresAt).getTime();
          const now = Date.now();
          const diff = Math.max(0, expires - now);
          newTimeLeft[order.id] = diff;

          if (diff === 0) {
            storage.updateOrder(order.id, { status: 'expired' });
            setOrders(storage.getOrders());
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const confirmOrder = (orderId: string) => {
    storage.updateOrder(orderId, { status: 'completed' });
    setOrders(storage.getOrders());
  };

  const cancelOrder = (orderId: string) => {
    storage.updateOrder(orderId, { status: 'cancelled' });
    setOrders(storage.getOrders());
  };

  return { orders, timeLeft, confirmOrder, cancelOrder };
}