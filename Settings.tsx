import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { storage } from '../utils/storage';
import { useLanguage } from '../utils/useLanguage';
import { User } from '../types';
import { Settings as SettingsIcon, User as UserIcon, Phone, CreditCard, Bell, Shield, Info, LogOut, Save, Globe } from 'lucide-react';

interface SettingsProps {
  user: User;
  onLogout: () => void;
}

export function Settings({ user, onLogout }: SettingsProps) {
  const { t, language, setLanguage } = useLanguage();
  const settings = storage.getSettings();
  const [rate, setRate] = useState(settings.rate.toString());
  const [notifications, setNotifications] = useState(settings.notifications);
  const [saved, setSaved] = useState(false);

  const handleSaveRate = () => {
    storage.saveSettings({ rate: parseFloat(rate) || 12650, notifications });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(
      language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '-';
    if (phone.startsWith('998')) {
      return `+998 ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`;
    }
    if (phone.startsWith('1')) {
      return `+1 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
    }
    if (phone.startsWith('7')) {
      return `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 9)} ${phone.slice(9)}`;
    }
    return `+${phone}`;
  };

  const formatCardNumber = (card: string) => {
    if (!card) return '-';
    return `${card.slice(0, 4)} **** **** ${card.slice(-4)}`;
  };

  return (
    <div className="space-y-4">
      {/* Profile */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-3 px-4 sm:px-6 pt-4">
          <CardTitle className="text-white flex items-center gap-3 text-lg">
            <UserIcon className="w-5 h-5 text-emerald-400" />
            {t.profileTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{user.name}</p>
              <p className="text-slate-400 text-sm">{t.groupMember}</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-slate-500" />
              <span>{formatPhone(user.phone)}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <span>{formatCardNumber(user.cardNumber)}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Info className="w-4 h-4 text-slate-500" />
              <span>{t.registered}: {formatDate(user.createdAt || '')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-3 px-4 sm:px-6 pt-4">
          <CardTitle className="text-white flex items-center gap-3 text-lg">
            <Globe className="w-5 h-5 text-blue-400" />
            {t.language}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setLanguage('uz')}
              className={`flex-1 ${language === 'uz' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              🇺🇿 {t.uzbek}
            </Button>
            <Button
              onClick={() => setLanguage('en')}
              className={`flex-1 ${language === 'en' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              🇺🇸 {t.english}
            </Button>
            <Button
              onClick={() => setLanguage('ru')}
              className={`flex-1 ${language === 'ru' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              🇷🇺 {t.russian}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate Settings */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-3 px-4 sm:px-6 pt-4">
          <CardTitle className="text-white flex items-center gap-3 text-lg">
            <SettingsIcon className="w-5 h-5 text-orange-400" />
            {t.rateSettings}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div>
            <Label className="text-slate-300 mb-2 block">{t.currentRate} (USDT)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="h-12 bg-slate-800 border-slate-700 text-white"
            />
            <p className="text-slate-500 text-xs mt-1">{t.rateHint}</p>
          </div>
          <Button
            onClick={handleSaveRate}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
          >
            {saved ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t.saved}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-3 px-4 sm:px-6 pt-4">
          <CardTitle className="text-white flex items-center gap-3 text-lg">
            <Bell className="w-5 h-5 text-purple-400" />
            {t.notifications}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">{t.newMessages}</span>
            <button
              onClick={() => {
                setNotifications(!notifications);
                storage.saveSettings({ notifications: !notifications });
              }}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </label>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-3 px-4 sm:px-6 pt-4">
          <CardTitle className="text-white flex items-center gap-3 text-lg">
            <Shield className="w-5 h-5 text-cyan-400" />
            {t.security}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <p className="text-slate-400 text-sm">{t.securityDesc}</p>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        onClick={onLogout}
        variant="destructive"
        className="w-full h-12 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
      >
        <LogOut className="w-5 h-5 mr-2" />
        {t.logoutBtn}
      </Button>
    </div>
  );
}