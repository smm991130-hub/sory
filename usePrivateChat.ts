import { useState, useEffect } from 'react';
import { storage } from './storage';
import { PrivateMessage, PrivateChat } from '../types';

export const usePrivateChat = (chatId: string | null) => {
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [chat, setChat] = useState<PrivateChat | null>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setChat(null);
      return;
    }

    setMessages(storage.getPrivateMessages(chatId));
    
    const chats = storage.getPrivateChats();
    setChat(chats.find(c => c.id === chatId) || null);

    const handleUpdate = () => {
      setMessages(storage.getPrivateMessages(chatId));
    };

    window.addEventListener('private_messages_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('private_messages_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [chatId]);

  const sendMessage = (content: string, senderId: string, senderName: string) => {
    if (!chatId) return;

    const message: PrivateMessage = {
      id: `pmsg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString()
    };

    storage.addPrivateMessage(message);
    setMessages(storage.getPrivateMessages(chatId));
  };

  return { messages, chat, sendMessage };
};