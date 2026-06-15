import { useState, useEffect } from 'react';
import { storage } from './storage';
import { Message, User } from '../types';

export function useChat(currentUser: User) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(storage.getMessages());

    const handleUpdate = () => {
      setMessages(storage.getMessages());
    };

    window.addEventListener('messages_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('messages_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const sendMessage = (content: string) => {
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      timestamp: new Date().toISOString(),
    };

    storage.addMessage(message);
    setMessages(storage.getMessages());
  };

  return { messages, sendMessage };
}