import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLanguage } from '../utils/useLanguage';
import { useChat } from '../utils/useChat';
import { User } from '../types';
import { MessageCircle, Send, Users } from 'lucide-react';

interface ChatProps {
  currentUser: User;
}

export function Chat({ currentUser }: ChatProps) {
  const { t } = useLanguage();
  const { messages, sendMessage } = useChat(currentUser);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeStr = date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    if (isToday) return `${t.today} ${timeStr}`;
    if (isYesterday) return `${t.yesterday} ${timeStr}`;
    return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short' }) + ' ' + timeStr;
  };

  return (
    <Card className="bg-slate-900 border-slate-800 h-[calc(100vh-200px)] min-h-[500px] flex flex-col">
      <CardHeader className="border-b border-slate-800 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            {t.chatTitle}
          </CardTitle>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Users className="w-4 h-4" />
            <span>{t.online}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-slate-400">{t.noMessages}</p>
            <p className="text-slate-500 text-sm">{t.writeFirst}</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.userId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    isOwn
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {!isOwn && (
                    <p className="text-emerald-400 text-sm font-medium mb-1">{msg.userName}</p>
                  )}
                  <p className="break-words">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.typeMessage}
            className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}