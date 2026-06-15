import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { storage } from '../utils/storage';
import { useLanguage } from '../utils/useLanguage';
import { Calculator, ArrowRight, ArrowLeft } from 'lucide-react';

export function USDCalculator() {
  const { t } = useLanguage();
  const settings = storage.getSettings();
  const [rate, setRate] = useState(settings.rate);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [sumAmount, setSumAmount] = useState('');

  const handleUsdtChange = (value: string) => {
    setUsdtAmount(value);
    if (value) {
      const sum = parseFloat(value) * rate;
      setSumAmount(sum.toLocaleString('uz-UZ'));
    } else {
      setSumAmount('');
    }
  };

  const handleSumChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    setSumAmount(cleanValue);
    if (cleanValue) {
      const usdt = parseFloat(cleanValue) / rate;
      setUsdtAmount(usdt.toFixed(2));
    } else {
      setUsdtAmount('');
    }
  };

  const quickAmounts = [10, 50, 100, 500, 1000];

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800 pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <span>{t.calcTitle}</span>
            <p className="text-slate-500 text-xs sm:text-sm font-normal mt-0.5">{t.calcDesc}</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* Current Rate */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">{t.currentRate}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{rate.toLocaleString('uz-UZ')}</span>
            <span className="text-slate-400">{t.som}</span>
            <span className="text-slate-500">/ USDT</span>
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-2">{t.quickAmounts}</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleUsdtChange(amount.toString())}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                {amount} USDT
              </Button>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="space-y-4">
          {/* USDT to SUM */}
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <label className="text-slate-400 text-sm mb-2 block">{t.usdtToSum}</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={usdtAmount}
                onChange={(e) => handleUsdtChange(e.target.value)}
                placeholder="0.00"
                className="h-12 bg-slate-700 border-slate-600 text-white text-lg"
              />
              <ArrowRight className="w-5 h-5 text-slate-500" />
              <div className="flex-1 h-12 bg-slate-700 rounded-lg px-4 flex items-center">
                <span className="text-white text-lg">{sumAmount || '0'}</span>
              </div>
            </div>
          </div>

          {/* SUM to USDT */}
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <label className="text-slate-400 text-sm mb-2 block">{t.sumToUsdt}</label>
            <div className="flex items-center gap-3">
              <Input
                type="text"
                value={sumAmount}
                onChange={(e) => handleSumChange(e.target.value)}
                placeholder="0"
                className="h-12 bg-slate-700 border-slate-600 text-white text-lg"
              />
              <ArrowLeft className="w-5 h-5 text-slate-500" />
              <div className="flex-1 h-12 bg-slate-700 rounded-lg px-4 flex items-center">
                <span className="text-white text-lg">{usdtAmount || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}