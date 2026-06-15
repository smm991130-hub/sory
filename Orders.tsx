import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useLanguage } from '../utils/useLanguage';
import { useOrders } from '../utils/useOrders';
import { User } from '../types';
import { ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface OrdersProps {
  currentUser: User;
}

export function Orders({ currentUser }: OrdersProps) {
  const { t } = useLanguage();
  const { orders, timeLeft, confirmOrder, cancelOrder } = useOrders(currentUser.id);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(num);
  };

  const formatTimeLeft = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status !== 'pending');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-rose-400" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-slate-400" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t.pending;
      case 'completed': return t.completed;
      case 'cancelled': return t.cancelled;
      case 'expired': return t.expired;
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{t.ordersTitle}</h2>
        <p className="text-slate-400">{t.ordersDesc}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'active'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.activeOrders} ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'completed'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.completedOrders} ({completedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {(activeTab === 'active' ? activeOrders : completedOrders).length === 0 ? (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">{t.noOrders}</p>
            </CardContent>
          </Card>
        ) : (
          (activeTab === 'active' ? activeOrders : completedOrders).map((order) => (
            <Card key={order.id} className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-white font-medium">{getStatusText(order.status)}</span>
                    {order.status === 'pending' && timeLeft[order.id] !== undefined && (
                      <span className="text-amber-400 text-sm">
                        ({formatTimeLeft(timeLeft[order.id])})
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{order.amount} USDT</p>
                    <p className="text-slate-400 text-sm">{formatNumber(order.total)} {t.som}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-800/50 rounded-lg p-3 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">{t.buyer}</p>
                    <p className="text-white font-medium">{order.buyerName}</p>
                    {order.buyerId === currentUser.id && (
                      <span className="text-emerald-400 text-xs">({t.you})</span>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{t.seller}</p>
                    <p className="text-white font-medium">{order.sellerName}</p>
                    {order.sellerId === currentUser.id && (
                      <span className="text-emerald-400 text-xs">({t.you})</span>
                    )}
                  </div>
                </div>

                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    {order.type === 'sell' && order.buyerId === currentUser.id && (
                      <Button
                        onClick={() => confirmOrder(order.id)}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                      >
                        {t.confirmOrder}
                      </Button>
                    )}
                    <Button
                      onClick={() => cancelOrder(order.id)}
                      variant="outline"
                      className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      {t.cancelOrder}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}