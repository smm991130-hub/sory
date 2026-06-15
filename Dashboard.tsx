import { useState } from 'react';
import { User } from '../types';
import { useLanguage } from '../utils/useLanguage';
import { P2PBoard } from './P2PBoard';
import { Chat } from './Chat';
import { Orders } from './Orders';
import { Settings } from './Settings';
import { Button } from '../components/ui/button';
import { TrendingUp, MessageCircle, ShoppingCart, Settings as SettingsIcon, LogOut, User as UserIcon } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'p2p' | 'chat' | 'orders' | 'settings';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('p2p');

  const tabs = [
    { id: 'p2p' as TabType, label: t.p2p, icon: TrendingUp },
    { id: 'chat' as TabType, label: t.chat, icon: MessageCircle },
    { id: 'orders' as TabType, label: t.orders, icon: ShoppingCart },
    { id: 'settings' as TabType, label: t.settings, icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">USDT P2P</h1>
                <p className="text-slate-400 text-sm">{t.groupMember}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                <UserIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm font-medium">{user.name}</span>
              </div>
              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900/50 border-b border-slate-800 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'p2p' && <P2PBoard currentUser={user} />}
        {activeTab === 'chat' && <Chat currentUser={user} />}
        {activeTab === 'orders' && <Orders currentUser={user} />}
        {activeTab === 'settings' && <Settings user={user} onLogout={onLogout} />}
      </main>
    </div>
  );
}