import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { storage } from '../utils/storage';
import { useLanguage } from '../utils/useLanguage';
import { P2PListing, User } from '../types';
import { TrendingUp, TrendingDown, Plus, X, Phone, CreditCard, Clock, DollarSign } from 'lucide-react';

interface P2PBoardProps {
  currentUser: User;
}

export function P2PBoard({ currentUser }: P2PBoardProps) {
  const { t } = useLanguage();
  const [listings, setListings] = useState<P2PListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const loadedListings = storage.getListings();
    setListings(loadedListings);
    
    const handleUpdate = () => setListings(storage.getListings());
    window.addEventListener('listings_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('listings_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const formatCardNumber = (card: string) => {
    const cleaned = card.replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('998') && cleaned.length === 12) {
      return `+998 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 11)} ${cleaned.slice(11)}`;
    }
    return `+${cleaned}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(num);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    
    if (!amountNum || !priceNum) return;

    const listing: P2PListing = {
      id: `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      userCardNumber: currentUser.cardNumber,
      type: formType,
      amount: amountNum,
      price: priceNum,
      total: amountNum * priceNum,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    storage.addListing(listing);
    setListings(storage.getListings());
    setShowForm(false);
    setAmount('');
    setPrice('');
  };

  const deleteListing = (id: string) => {
    storage.deleteListing(id);
    setListings(storage.getListings());
  };

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t.now;
    if (diffMins < 60) return `${diffMins} ${t.minutesAgo}`;
    if (diffHours < 24) return `${diffHours} ${t.hoursAgo}`;
    return `${diffDays} ${t.daysAgo}`;
  };

  const buyListings = listings.filter(l => l.type === 'buy');
  const sellListings = listings.filter(l => l.type === 'sell');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{t.p2pTitle}</h2>
          <p className="text-slate-400">{t.p2pDesc}</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.newListing}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t.listingsCount}</p>
                <p className="text-white font-bold text-xl">{buyListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t.sellCount}</p>
                <p className="text-white font-bold text-xl">{sellListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t.volumeUsdt}</p>
                <p className="text-white font-bold text-xl">{formatNumber(listings.reduce((sum, l) => sum + l.amount, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t.now}</p>
                <p className="text-white font-bold text-xl">{listings.filter(l => l.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">{t.newListing}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('buy')}
                    className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                      formType === 'buy'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    {t.buyUsdt}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('sell')}
                    className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                      formType === 'sell'
                        ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <TrendingDown className="w-5 h-5" />
                    {t.sellUsdt}
                  </button>
                </div>

                <div>
                  <Label className="text-slate-300">{t.usdtAmount}</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100"
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">{t.price}</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="12650"
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {amount && price && (
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-slate-400 text-sm">{t.total}</p>
                    <p className="text-white font-bold text-lg">
                      {formatNumber(parseFloat(amount) * parseFloat(price))} {t.som}
                    </p>
                  </div>
                )}

                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">{t.cardNumber}</p>
                  <p className="text-white font-mono">{formatCardNumber(currentUser.cardNumber)}</p>
                  <p className="text-slate-400 text-sm mt-2">{t.phone}</p>
                  <p className="text-white">{formatPhone(currentUser.phone)}</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  {t.newListing}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buy Listings */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              {t.buyUsdt}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyListings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">{t.noListings}</p>
                <p className="text-slate-500 text-sm">{t.beFirst}</p>
              </div>
            ) : (
              buyListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-semibold">{listing.userName}</p>
                      <p className="text-slate-400 text-sm">{getTimeAgo(listing.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-lg">{listing.amount} USDT</p>
                      <p className="text-slate-400 text-sm">{formatNumber(listing.price)} {t.som}</p>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        {t.cardNumber}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-mono text-sm">{formatCardNumber(listing.userCardNumber)}</span>
                        <button
                          onClick={() => copyToClipboard(listing.userCardNumber, `card-${listing.id}`)}
                          className="text-slate-400 hover:text-white text-xs"
                        >
                          {copiedId === `card-${listing.id}` ? t.copied : t.copy}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {t.phone}
                      </span>
                      <span className="text-white text-sm">{formatPhone(listing.userPhone)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-white font-semibold">{formatNumber(listing.total)} {t.som}</p>
                    {listing.userId === currentUser.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteListing(listing.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      >
                        {t.delete}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Sell Listings */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-400" />
              {t.sellUsdt}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sellListings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">{t.noListings}</p>
                <p className="text-slate-500 text-sm">{t.beFirst}</p>
              </div>
            ) : (
              sellListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-rose-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-semibold">{listing.userName}</p>
                      <p className="text-slate-400 text-sm">{getTimeAgo(listing.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-rose-400 font-bold text-lg">{listing.amount} USDT</p>
                      <p className="text-slate-400 text-sm">{formatNumber(listing.price)} {t.som}</p>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        {t.cardNumber}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-mono text-sm">{formatCardNumber(listing.userCardNumber)}</span>
                        <button
                          onClick={() => copyToClipboard(listing.userCardNumber, `card-${listing.id}`)}
                          className="text-slate-400 hover:text-white text-xs"
                        >
                          {copiedId === `card-${listing.id}` ? t.copied : t.copy}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {t.phone}
                      </span>
                      <span className="text-white text-sm">{formatPhone(listing.userPhone)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-white font-semibold">{formatNumber(listing.total)} {t.som}</p>
                    {listing.userId === currentUser.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteListing(listing.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      >
                        {t.delete}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}